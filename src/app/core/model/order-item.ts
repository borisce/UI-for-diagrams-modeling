import {UUID} from "antlr4ts/misc/UUID";
import {CorePublic} from "./core-public";

export interface OrderItem {
  uuid: UUID;
  core: CorePublic;
  variation: string;
  created: string;
  last_modified: string;
  price: number;
  tax_price: number;
}
