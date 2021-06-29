export interface Price {
  customerId: string;
  customerName: string;
  productId: string;
  productName: string;
  productCode: string;
  from?: string;
  to?: string;
  value: number;
}
