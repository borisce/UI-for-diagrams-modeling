import {Payment} from "./payment";
import {OrderItem} from "./order-item";
import {OrderState} from "./order-state";

export interface Order {
  uuid: string;
  created: string;
  last_modified: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: number;
  address: string;
  city: string;
  zip_code: number;
  country: string;
  total_price: number;
  total_tax_price: number;
  state: OrderState;
  states: OrderState[];
  payments: Payment[];
  items: OrderItem[];
}
