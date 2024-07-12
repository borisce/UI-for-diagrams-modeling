import {Component, OnInit} from '@angular/core';
import {CartService} from "../../core/service/cart.service";
import {UUID} from "antlr4ts/misc/UUID";
import {ModalConfirmComponent} from "../../modal/modal-confirm/modal-confirm.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})

export class CartComponent implements OnInit {


  constructor(
    public cartService: CartService,
    private dialog: MatDialog
  ) {
  }

  public ngOnInit(): void {
  }

  public async removeItem(uuid: UUID): Promise<void> {
    const dialogRef: MatDialogRef<ModalConfirmComponent> = this.dialog.open(ModalConfirmComponent, {
      data: {message: 'Are you sure you want remove this item from cart?'},
      width: 'auto'
    });
    const remove: boolean = await dialogRef.afterClosed().toPromise();
    if (remove) {
      this.cartService.deleteFromCart(uuid);
    }
  }

  public changeItemVariation(uuid: UUID, variation: string): void {
    this.cartService.changeVariation(uuid, variation);
  }

}
