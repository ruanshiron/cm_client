export interface Amount {
  workshopId: string;
  workshopName: string;
  productId: string;
  productName: string;
  productCode: string;
  processId: string;
  processName: string;
  amount: number;
  from?: string;
  to?: string;
}
