import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreService } from './core.service';
import { environment } from '../../../environments/environment';
import { Cart } from '../model/cart';
import { UUID } from 'antlr4ts/misc/UUID';
import { CartItem } from '../model/cart-item';
import { AuthenticationService } from './authentication.service';
import { StatusMessageService } from './status-message.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  public cart: Cart = null;
  public cartOpen: boolean = false;

  @Output() public itemAdded: EventEmitter<any> = new EventEmitter<void>();

  constructor(
    private http: HttpClient,
    private coreService: CoreService,
    private authenticationService: AuthenticationService,
    private statusMessageService: StatusMessageService,
  ) {
    if (authenticationService.loggedIn) {
      this.refreshCart();
    } else {
      this.authenticationService.authenticationStatusChange.subscribe((val: string) => {
        if (val === 'authenticated') {
          this.refreshCart();
        }
      });
    }
  }

  public get isCartLoaded(): boolean {
    return this.cart != null;
  }

  public get cartItemCount(): number {
    if (this.cart === null) {
      return 0;
    }
    return this.cart.total_items;
  }

  public get cartItems(): CartItem[] {
    if (this.cart === null) {
      return [];
    }
    return this.cart.items;
  }

  public get totalPrice(): number {
    if (this.cart === null) {
      return 0;
    }
    return this.cart.total_price;
  }

  public get totalTaxPrice(): number {
    if (this.cart === null) {
      return 0;
    }
    return this.cart.total_tax_price;
  }

  public refreshCart(): void {
    this.http.get<Cart>(environment.baseUrl + '/cart')
      .subscribe((c: Cart) => {
          this.cart = c;
        },
        (error) => {
          this.statusMessageService.addError(error);
        });
  }

  public clearCartItems(): void {
    this.cart = null;
  }

  public addToCart(core_uuid?: UUID, variation?: string,
                   core_ownership_uuid?: UUID): void {
    this.http.post<Cart>(environment.baseUrl + '/cart', {
      core_uuid,
      variation,
      core_ownership_uuid
    })
      .subscribe((c: Cart) => {
        this.cart = c;
        this.itemAdded.emit();
      }, (error) => {
        this.statusMessageService.addError(error);
      });
  }

  public addPackagesToCart(type: string, packages: number[], numberOfMembers: object, packageTimeRange: number): void {
    packages.forEach(packageId => {
      const currentNumberOfMembers: number = numberOfMembers[packageId];
      console.log('aaaaa',packageId, currentNumberOfMembers, packageTimeRange, numberOfMembers);
      this.http.post<Cart>(environment.baseUrl + '/cart/packages', {
        type,
        packageId,
        currentNumberOfMembers,
        packageTimeRange
      })
        .subscribe((c: Cart) => {
          this.cart = c;
          this.itemAdded.emit();
        }, (error) => {
          this.statusMessageService.addError(error);
        });
    });
  }

  public isInCart(core_uuid?: UUID, variation?: string,
                  core_ownership_uuid?: UUID): boolean {
    for (const cartItem of this.cart.items) {
      if (variation !== cartItem.variation) {
        continue;
      }
      if (variation === 'UPGRADE') {
        if (cartItem.core_ownership === null) {
          continue;
        }
        if (cartItem.core_ownership.uuid === core_ownership_uuid) {
          return true;
        }
      } else {
        if (cartItem.core.uuid === core_uuid) {
          return true;
        }
      }
    }
    return false;
  }

  public deleteFromCart(uuid: UUID): void {
    this.http.delete<Cart>(environment.baseUrl + '/cart/' + uuid)
      .subscribe((c: Cart) => {
        this.cart = c;
        this.statusMessageService.addSuccess('Cart item removed');
      }, (error) => {
        this.statusMessageService.addError(error);
      });
  }

  public changeVariation(uuid: UUID, variation: string): void {
    this.http.patch<Cart>(environment.baseUrl + '/cart/' + uuid, {
      variation
    }).subscribe((c: Cart) => {
      this.cart = c;
      this.statusMessageService.addSuccess('Variation changed');
    }, (error) => {
      this.statusMessageService.addError(error);
    });
  }

  public openCart(): void {
    this.cartOpen = true;
  }

  public closeCart(): void {
    this.cartOpen = false;
  }
}
