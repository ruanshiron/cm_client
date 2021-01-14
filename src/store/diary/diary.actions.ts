import { AppDispatch } from "..";
import { database } from "../../config/firebase";
import { Event } from "../../models/Diary";
import { DispatchObject } from "../../utils/types";

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
        dispatch(getEventsSuccess(snap.docs.map((doc) => doc.data())));
      })
      .catch((snap) => {
        dispatch(getEventsFailure());
      });
  };
};

const getEventsStarted = () => ({ type: DiaryActionTypes.GET_EVENTS_STARTED });

const getEventsSuccess = (events: Event[]) => ({
  type: DiaryActionTypes.GET_EVENTS_SUCCESS,
  payload: [...events],
});

const getEventsFailure = () => ({ type: DiaryActionTypes.GET_EVENTS_FAILURE });

export type DiaryActions = DispatchObject;
