import { UUID } from 'antlr4ts/misc/UUID';

export interface PackageItem {
  pricePackageId: number;
  uuid: UUID;
  type: number;
  numberOfMembers: number;
  price: number;
  tax_price: number;
}
