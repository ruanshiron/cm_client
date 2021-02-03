import { AppDispatch } from "..";
import { database } from "../../config/firebase";
import { Event, Product, Workshop } from "../../models";
import _ from "lodash";
import { ACTIONS } from "../action.types";
import { DataState } from "./data.state";

export const getEvents = (onSuccess = () => {}, onError = () => {}) => {
  const getEventsStarted = () => ({
    type: ACTIONS.DATA.EVENT.GET.STARTED,
  });
  const getEventsSuccess = (data: Partial<DataState>) => ({
    type: ACTIONS.DATA.EVENT.GET.SUCCESS,
    payload: data,
  });
  const getEventsFailure = () => ({
    type: ACTIONS.DATA.EVENT.GET.FAILURE,
  });

  const fitler = (events: Event[]) =>
    _.chain(events)
      .groupBy((event) => {
        const date = new Date(event.selectedDate!);
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
      })
      .map((value, key) => ({ name: key, events: value }))
      .value()
      .sort(function (a, b) {
        return +new Date(b.name) - +new Date(a.name);
      });

  return async (dispatch: AppDispatch) => {
    dispatch(getEventsStarted());
    try {
      const snap = await database.collection("events").get();
      const events: Event[] = await snap.docs.map((doc) => doc.data());
      const filteredEvents = fitler(events);
      dispatch(getEventsSuccess({ events, filteredEvents }));
      onSuccess();
    } catch (error) {
      dispatch(getEventsFailure());
      onError();
    }
  };
};

export const saveEvent = (
  event: Event,
  onSuccess = () => {},
  onError = () => {}
) => {
  const saveEventStarted = () => ({
    type: ACTIONS.DATA.EVENT.SAVE.STARTED,
  });
  const saveEventSuccess = (event: Event) => ({
    type: ACTIONS.DATA.EVENT.SAVE.SUCCESS,
    payload: event,
  });
  const saveEventFailure = () => ({
    type: ACTIONS.DATA.EVENT.SAVE.FAILURE,
  });

  return async (dispatch: AppDispatch) => {
    dispatch(saveEventStarted());
    try {
      const permittedEvent = _.pickBy(event, _.identity);
      event.id
        ? await database.collection("events").doc(event.id!).set(permittedEvent)
        : await database.collection("events").add(permittedEvent);
      dispatch(saveEventSuccess(event));
      onSuccess();
    } catch (error) {
      dispatch(saveEventFailure());
      onError();
    }
  };
};

export const getProducts = () => {
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

export const saveProduct = (
  product: Product,
  onSuccess = () => {},
  onError = () => {}
) => {
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

export const getWorkshops = () => {
  const getWorkshopsStarted = () => ({
    type: ACTIONS.DATA.WORKSHOP.GET.STARTED,
  });
  const getWorkshopsSuccess = (workshops: Workshop[]) => ({
    type: ACTIONS.DATA.WORKSHOP.GET.SUCCESS,
    payload: [...workshops],
  });
  const getWorkshopsFailure = () => ({
    type: ACTIONS.DATA.WORKSHOP.GET.FAILURE,
  });

  return async (dispatch: AppDispatch) => {
    dispatch(getWorkshopsStarted());
    try {
      const snap = await database.collection("workshops").get();
      const workshops = await snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(getWorkshopsSuccess(workshops));
    } catch (error) {
      dispatch(getWorkshopsFailure());
    }
  };
};

export const saveWorkshop = (
  workshop: Workshop,
  onSuccess = () => {},
  onError = () => {}
) => {
  const saveWorkshopStarted = () => ({
    type: ACTIONS.DATA.WORKSHOP.SAVE.STARTED,
  });
  const saveWorkshopFailure = () => ({
    type: ACTIONS.DATA.WORKSHOP.SAVE.FAILURE,
  });
  const saveWorkshopSuccess = (workshop: Workshop) => ({
    type: ACTIONS.DATA.WORKSHOP.SAVE.SUCCESS,
    payload: workshop,
  });
  return async (dispatch: AppDispatch) => {
    dispatch(saveWorkshopStarted());
    try {
      let a = await database.collection("workshops").add(workshop);
      console.log(a.id);
      
      dispatch(saveWorkshopSuccess(workshop));
      onSuccess();
    } catch (error) {
      dispatch(saveWorkshopFailure());
      onError();
    }
  };
};
