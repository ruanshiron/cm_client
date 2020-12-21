import { Event } from "../../models/Diary";

export interface DiaryState {
  loading: boolean;
  events: Event[];
}
