import {PaymentState} from "./payment-state";

export interface Payment {
  uuid: string;
  payment_method: string;
  state: PaymentState;
  states: PaymentState[];
  created: string;
  last_modified: string;
  payment_method_url: string;
}
