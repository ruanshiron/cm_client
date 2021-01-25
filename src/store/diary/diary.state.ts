import { Event, EventGroup } from "../../models/Diary";

export interface DiaryState {
  loading: boolean;
  events: Event[];
  groups: EventGroup[];
}
