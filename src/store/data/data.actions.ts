import { AppDispatch } from "..";
import { database } from "../../config/firebase";
import { Event, EventGroup, Product } from "../../models";
import _ from "lodash";
import { DispatchObject } from "../../utils/types";

export const DataActionTypes = {
  ADD_EVENT: "add_event",
  GET_EVENTS_STARTED: "get_events_started",
  GET_EVENTS_SUCCESS: "get_events_success",
  GET_EVENTS_FAILURE: "get_events_failure",

  ADD_PRODUCT: "add_product",
  GET_PRODUCTS_STARTED: "get_products_started",
  GET_PRODUCTS_SUCCESS: "get_products_success",
  GET_PRODUCTS_FAILURE: "get_products_failure",
};

export const addEvent = (event: Event) => ({
  type: DataActionTypes.ADD_EVENT,
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

const getEventsStarted = () => ({ type: DataActionTypes.GET_EVENTS_STARTED });

const getEventsSuccess = (events: Event[], filteredEvents: EventGroup[]) => ({
  type: DataActionTypes.GET_EVENTS_SUCCESS,
  payload: {
    events,
    filteredEvents,
  },
});

const getEventsFailure = () => ({ type: DataActionTypes.GET_EVENTS_FAILURE });

export const addProduct = (product: Product) => ({
  type: DataActionTypes.ADD_PRODUCT,
  product,
});

export const getProducts = () => {
  return (dispatch: AppDispatch) => {
    dispatch(getProductsStarted());
    database
      .collection("products")
      .get()
      .then((snap) => {
        dispatch(
          getProductsSuccess(
            snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          )
        );
      })
      .catch((snap) => {
        dispatch(getProductsFailure());
      });
  };
};

const getProductsStarted = () => ({
  type: DataActionTypes.GET_PRODUCTS_STARTED,
});

const getProductsSuccess = (products: Product[]) => ({
  type: DataActionTypes.GET_PRODUCTS_SUCCESS,
  payload: [...products],
});

const getProductsFailure = () => ({
  type: DataActionTypes.GET_PRODUCTS_FAILURE,
});

export type DataActions = DispatchObject;
