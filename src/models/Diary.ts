export interface Event {
  id?: any;
  quantity?: number;
  productCode?: string;
  sizeCode?: string;
  typeCode?: string;
  workshop?: string;
  selectedDate?: string;
  note?: string;
}

export interface EventGroup {
  date: string;
  events: Event[];
}