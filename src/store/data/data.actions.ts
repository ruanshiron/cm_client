import { AppDispatch } from "..";
import { database } from "../../config/firebase";
import { Event, EventGroup, Product } from "../../models";
import _ from "lodash";
import { ACTIONS } from "../action.types";

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

const getEventsStarted = () => ({ type: ACTIONS.DATA.EVENT.GET.STARTED });

const getEventsSuccess = (events: Event[], filteredEvents: EventGroup[]) => ({
  type: ACTIONS.DATA.EVENT.GET.SUCCESS,
  payload: {
    events,
    filteredEvents,
  },
});

const getEventsFailure = () => ({ type: ACTIONS.DATA.EVENT.GET.FAILURE });

export const getProducts = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(getProductsStarted());
    try {
      const snap = await database.collection("products").get();
      const products = await snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(getProductsSuccess(products));
    } catch (error) {
      dispatch(getProductsFailure());
    }
  };
};

const getProductsStarted = () => ({
  type: ACTIONS.DATA.PRODUCT.GET.STARTED,
});
const getProductsSuccess = (products: Product[]) => ({
  type: ACTIONS.DATA.PRODUCT.GET.SUCCESS,
  payload: [...products],
});
const getProductsFailure = () => ({
  type: ACTIONS.DATA.PRODUCT.GET.FAILURE,
});

export const saveProduct = (
  product: Product,
  onSuccess = () => {},
  onError = () => {}
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(saveProductStarted());
    try {
      await database.collection("products").doc(product.code!).set(product);
      dispatch(saveProductSuccess(product));
      onSuccess();
    } catch (error) {
      dispatch(saveProductFailure());
      onError();
    }
  };
};

const saveProductStarted = () => ({
  type: ACTIONS.DATA.PRODUCT.SAVE.STARTED,
});
const saveProductFailure = () => ({
  type: ACTIONS.DATA.PRODUCT.SAVE.FAILURE,
});
const saveProductSuccess = (product: Product) => ({
  type: ACTIONS.DATA.PRODUCT.SAVE.SUCCESS,
  payload: product,
});
