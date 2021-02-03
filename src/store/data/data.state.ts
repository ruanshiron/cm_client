import { Event, EventGroup, Product, Workshop } from "../../models";

export interface DataState {
  loading: boolean;
  events: Event[];
  products: Product[];
  workshops: Workshop[];
  filteredEvents: EventGroup[];
}
