export interface Event {
  id?: any;
  quantity?: number;
  productCode?: string;
  sizeCode?: string;
  typeCode?: string;
  workshop?: string;
  selectedDate?: string;
  note?: string;
  createdAt?: any;
}

export interface EventGroup {
  name: string;
  events: Event[];
}

export interface Product {
  id?: any;
  code?: string;
  name?: string;
  sizes?: string[];
  note?: string;
  reports?: Field[];
  createdAt?: any;
}

export interface Field {
  name: string;
  value: any;
}

export interface Workshop {
  id?: string;
  name?: string;
  phoneNumber?: string;
  createdAt?: any;
}

export interface Customer {
  id?: string;
  name?: string;
  phoneNumber?: string;
  createdAt?: any;
}

export interface Base {
  id?: string;
  createdAt?: any;
}
