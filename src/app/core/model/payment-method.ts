export interface PaymentMethod {
  name: string;
  description: string;
  namespace: string;
  logo: Base64<'png'>;
}
