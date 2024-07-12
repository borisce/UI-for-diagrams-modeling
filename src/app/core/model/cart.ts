import {CartItem} from "./cart-item";
import {PackageItem} from "./package-item";

export interface Cart {
  items: CartItem[];
  packages: PackageItem[];
  total_price: number;
  total_tax_price: number;
  total_items: number;
}
