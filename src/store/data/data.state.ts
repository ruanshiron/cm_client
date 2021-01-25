import { Event, EventGroup, Product } from "../../models";

export interface DataState {
  loading: boolean;
  events: Event[];
  products: Product[];
  filteredEvents: EventGroup[];
}
