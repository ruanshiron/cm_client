export interface Product {
  id?: any;
  code?: number;
  name?: string;
  sizes?: string[];
  note?: string;
  reports?: Field[];
}

export interface Field {
  name: string;
  value: any;
}
