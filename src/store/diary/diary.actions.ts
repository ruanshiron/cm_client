import { AppDispatch } from "..";
import { database } from "../../config/firebase";
import { Event, EventGroup } from "../../models/Diary";
import { DispatchObject } from "../../utils/types";
import _ from "lodash";

export const DiaryActionTypes = {
  ADD_EVENT: "add_event",
  GET_EVENTS_STARTED: "get_events_started",
  GET_EVENTS_SUCCESS: "get_events_success",
  GET_EVENTS_FAILURE: "get_events_failure",
};

export const addEvent = (event: Event) => ({
  type: DiaryActionTypes.ADD_EVENT,
  payload: event,
});

export const getEvents = () => {
  return (dispatch: AppDispatch) => {
    dispatch(getEventsStarted());
    database
      .collection("events")
      .get()
      .then((snap) => {
        const events: Event[] = snap.docs.map((doc) => doc.data());
        const groups = _.chain(events)
          .groupBy((event) => {
            const date = new Date(event.selectedDate!);
            return `${date.getFullYear()}/${
              date.getMonth() + 1
            }/${date.getDate()}`;
          })
          .map((value, key) => ({ name: key, events: value }))
          .value()
          .sort(function (a, b) {
            return +new Date(b.name) - +new Date(a.name);
          });

        dispatch(getEventsSuccess(events, groups));
      })
      .catch((snap) => {
        dispatch(getEventsFailure());
      });
  };
};

const getEventsStarted = () => ({ type: DiaryActionTypes.GET_EVENTS_STARTED });

const getEventsSuccess = (events: Event[], groups: EventGroup[]) => ({
  type: DiaryActionTypes.GET_EVENTS_SUCCESS,
  payload: {
    events,
    groups,
  },
});

const getEventsFailure = () => ({ type: DiaryActionTypes.GET_EVENTS_FAILURE });

export type DiaryActions = DispatchObject;
