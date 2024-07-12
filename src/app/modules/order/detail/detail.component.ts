import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from '../../../core/service/core.service';
import { OrderService } from '../../../core/service/order.service';
import { Order } from '../../../core/model/order';
import { UUID } from 'antlr4ts/misc/UUID';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalNewPaymentComponent } from '../../../modal/modal-new-payment-component/modal-new-payment.component';
import { StatusMessageService } from '../../../core/service/status-message.service';
import { OrderWithRedirect } from '../../../core/model/order-with-redirect';
import { Countries } from '../../../core/model/countries';

@Component({
  selector: 'app-order-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})

export class OrderDetailComponent implements OnInit {

  public uuid: UUID;
  public order: Order = null;
  public loadingState: boolean = true;
  public paymentLoadingState: boolean = false;

  constructor(
    private router: Router,
    private coreService: CoreService,
    public orderService: OrderService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private statusMessageService: StatusMessageService,
  ) {
    this.route.params.subscribe((params) => {
      if (this.uuid === null) {
        this.uuid = params.uuid;
      } else {
        if (params.uuid !== this.uuid) {
          this.uuid = params.uuid;
          this.getOrder();
        }
      }
    });
  }

  public ngOnInit(): void {
    this.getOrder();
  }

  public getCountryName(code: string): string {
    return Countries.find(c => c.code === code).name;
  }

  public async createNewPayment(): Promise<void> {
    const dialogRef: MatDialogRef<ModalNewPaymentComponent> = this.dialog
      .open(ModalNewPaymentComponent, {
        data: {order: this.order},
        width: 'auto'
      });
    const payment_method: string = await dialogRef.afterClosed().toPromise();
    if (payment_method !== undefined) {
      this.paymentLoadingState = true;
      this.orderService.createPayment(this.uuid, payment_method)
        .subscribe((o: OrderWithRedirect) => {
          window.location.replace(o.redirect_url);
        }, (error) => {
          this.paymentLoadingState = false;
          this.statusMessageService.addError(error);
        });
    }
  }

  public getPaymentOrderPayment(uuid: UUID): void {
    this.orderService.getPaymentOrderPayment(this.uuid)
      .subscribe((o: Order) => {
        this.order = o;
      }, (error) => {
        this.loadingState = false;
        this.statusMessageService.addError(error);
      });
  }

  private getOrder(): void {
    const type: string = this.route.snapshot.queryParamMap.get('type');

    this.loadingState = true;
    this.orderService.getOrder(this.uuid)
      .subscribe((o: Order) => {
        this.order = o;
        this.loadingState = false;

      }, (error) => {
        this.loadingState = false;
        this.statusMessageService.addError(error);
        this.router.navigate(['/orders']).finally();
      });

    if (type === 'paypal') {
      this.getPaymentOrderPayment(this.uuid);
    }
  }
}
