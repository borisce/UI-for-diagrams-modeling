import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PaymentMethod} from "../../core/model/payment-method";
import {OrderService} from "../../core/service/order.service";
import {StatusMessageService} from "../../core/service/status-message.service";
import {Order} from "../../core/model/order";

@Component({
  selector: 'app-modal-new-branch',
  styleUrls: ['./modal-new-payment.component.scss'],
  templateUrl: './modal-new-payment.component.html'
})
export class ModalNewPaymentComponent implements OnInit {
  public paymentMethods: PaymentMethod[] = null;
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalNewPaymentComponent>,
    public orderService: OrderService,
    private statusMessageService: StatusMessageService,
    @Inject(MAT_DIALOG_DATA) public data: { order: Order },
  ) {
    this.form = this.fb.group({
      payment_method: ['', Validators.required]
    });
  }


  public ngOnInit(): void {
    this.getPaymentMethods();
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.dialogRef.close(this.form.controls.payment_method.value);
  }

  public closeDialog(e: MouseEvent): void {
    e.preventDefault();
    this.dialogRef.close(undefined);
  }

  private getPaymentMethods(): void {
    this.orderService.getPaymentMethods()
      .subscribe((p: PaymentMethod[]) => {
          this.paymentMethods = p;
          if (p.length > 0) {
            this.form.controls['payment_method'].setValue(p[0].namespace);
          }
        },
        (error) => {
          this.statusMessageService.addError(error);
          this.dialogRef.close(undefined);
        });
  }
}
