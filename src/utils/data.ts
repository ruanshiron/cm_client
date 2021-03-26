import * as Event from "../models/event";
import { formatDate } from "./date";
import _ from "lodash";

// TODO: Should use a faster sort

export function addFilteredEvent(
  event: Event.Skeleton,
  filteredEvents: Event.Group[]
) {
  const date = formatDate(event.date!);
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

export const filter = (events: Event.Skeleton[]) =>
  _.chain(events)
    .groupBy((event) => {
      const date = new Date(event.date!);
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    })
    .map((value, key) => ({ name: key, events: value }))
    .value()
    .sort(function (a, b) {
      return +new Date(b.name) - +new Date(a.name);
    });
