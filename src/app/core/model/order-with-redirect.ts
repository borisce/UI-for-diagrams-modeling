import {Order} from "./order";

export interface OrderWithRedirect extends Order {
  redirect_url: string;
}
