import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CoreService} from "../../../core/service/core.service";
import {CartService} from "../../../core/service/cart.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../../../core/service/order.service";
import {PaymentMethod} from "../../../core/model/payment-method";
import {Countries, Country} from "../../../core/model/countries";
import {OrderWithRedirect} from "../../../core/model/order-with-redirect";
import {StatusMessageService} from "../../../core/service/status-message.service";
import {AuthenticationService} from "../../../core/service";
import {Order} from "../../../core/model/order";
import {Page} from "../../../core/model/page";

@Component({
  selector: 'app-order-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})

export class OrderCreateComponent implements OnInit {

  public countries: Country [] = Countries;
  public orderForm: FormGroup;
  public paymentMethods: PaymentMethod[] = [];
  public order: OrderWithRedirect = null;
  public loadingState: boolean = false;

  constructor(
    private router: Router,
    private coreService: CoreService,
    public cartService: CartService,
    public orderService: OrderService,
    private fb: FormBuilder,
    private statusMessageService: StatusMessageService,
    public authenticationService: AuthenticationService,
  ) {
    this.orderForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zip_code: ['', Validators.required],
      country: ['SK', Validators.required],
      payment_method: ['stripe', Validators.required],
      order_as_organization: [false, Validators.required]
    });
  }

  public ngOnInit(): void {
    this.getPaymentMethods();
    this.fillFromLastOrder();
  }

  public fillFromLastOrder(): void {
    this.orderService.getOrders(0, 1).subscribe((po: Page<Order>) => {
        if (po.totalElements > 0) {
          const o: Order = po.content[0];
          this.orderForm.controls['first_name'].setValue(o.first_name);
          this.orderForm.controls['last_name'].setValue(o.last_name);
          this.orderForm.controls['email'].setValue(o.email);
          this.orderForm.controls['phone_number'].setValue(o.phone_number);
          this.orderForm.controls['address'].setValue(o.address);
          this.orderForm.controls['city'].setValue(o.city);
          this.orderForm.controls['zip_code'].setValue(o.zip_code);
          this.orderForm.controls['country'].setValue(o.country);
        }
      },
      (error) => {
      });
  }

  public async createOrder(): Promise<void> {
    this.loadingState = true;
    this.orderService.createOrder(this.orderForm.value)
      .subscribe((o: OrderWithRedirect) => {
          this.order = o;
          this.loadingState = false;
          window.location.replace(this.order.redirect_url);
        },
        (error) => {
          this.loadingState = false;
          this.statusMessageService.addError(error);
        });
  }

  private getPaymentMethods(): void {
    this.orderService.getPaymentMethods()
      .subscribe((p: PaymentMethod[]) => {
          this.paymentMethods = p;
          if (p.length === 0) {
            this.statusMessageService.addError('No payment methods available');
          }
        },
        (error) => {
          this.statusMessageService.addError(error);
        });
  }
}
