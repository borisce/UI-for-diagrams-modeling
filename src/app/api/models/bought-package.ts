export interface BoughtPackage {
  id: number;
  uuid: string;
  created: any;
  lastModified: any;
  active: boolean;
  end_date: any;
  members: number;
  orderId: bigint;
  pricePackageId: bigint;
  type: string;
  user_id: bigint;
}
