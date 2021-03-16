export interface Base {
  id?: string;
  createdAt?: any;
}
export interface Event extends Base {
  quantity?: number;
  product?: string;
  size?: string;
  process?: string;
  workshop?: string;
  date?: string;
  note?: string;
}

export interface EventGroup {
  name: string;
  events: Event[];
}

export interface Product extends Base {
  code?: string;
  name?: string;
  sizes?: string[];
  note?: string;
  processes?: string[];
  reports?: Field[];
}

export interface Field {
  name: string;
  value: any;
}

export interface Workshop extends Base {
  name?: string;
  phonenumber?: string;
}

export interface Customer extends Base {
  name?: string;
  phonenumber?: string;
}

export interface Employee extends Base {
  name?: string;
  phonenumber?: string;
}

export interface MaterialStore extends Base {
  name?: string;
  phonenumber?: string;
  types?: string[];
}

export interface Line {
  product?: string;
  size?: string;
  quantity?: number;
}
export interface Order extends Base {
  customer?: string;
  lines: Line[];
  note?: string;
}

export interface Process extends Base {
  name?: string;
  rejected?: string;
  fulfilled?: string;
  pending?: string;
}

export const ProcessEnum: { [key: string]: string } = {
  pending: "đang ",
  fulfilled: "đã ",
  rejected: "lỗi ",
};




