import {UUID} from "antlr4ts/misc/UUID";
import {CorePublic} from "./core-public";
import {CoreOwnership} from "./core-ownership";

export interface CartItem {
  uuid: UUID;
  core: CorePublic;
  core_ownership: CoreOwnership;
  variation: string;
  created: string;
  last_modified: string;
  price: number;
  tax_price: number;
  package_id: any;
}
