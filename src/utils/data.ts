import { Event, EventGroup } from "../models";
import { formatDate } from "./date";

// TODO: Should use a faster sort

export function addFilteredEvent(event: Event, filteredEvents: EventGroup[]) {
  const date = formatDate(event.selectedDate!);
  const selectedItem = filteredEvents.find((item) => item.name === date);

  if (selectedItem) {
    selectedItem.events.push(event);
  } else {
    filteredEvents.push({ name: date, events: [event] });
  }

  return [...filteredEvents].sort(function (a, b) {
    return +new Date(b.name) - +new Date(a.name);
  });
}
