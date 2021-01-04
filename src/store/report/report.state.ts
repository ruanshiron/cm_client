import { Product } from "../../models/Report";

export interface ReportState {
  loading: boolean;
  products: Product[];
}
