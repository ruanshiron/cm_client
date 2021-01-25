import { DataActions, DataActionTypes } from "./data.actions";
import { DataState } from "./data.state";

const initialDiaryState: DataState = {
  events: [],
  filteredEvents: [],
  products: [],
  loading: false,
};

export const dataReducer = (
  state: DataState = initialDiaryState,
  action: DataActions
): DataState => {
  switch (action.type) {
    case DataActionTypes.ADD_EVENT:
      return {
        ...state,
        loading: false,
        events: [action.payload, ...state.events],
      };
    case DataActionTypes.GET_EVENTS_STARTED:
      return {
        ...state,
        loading: true,
      };
    case DataActionTypes.GET_EVENTS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case DataActionTypes.GET_EVENTS_FAILURE:
      return {
        ...state,
        events: [],
        loading: false,
      };
    case DataActionTypes.ADD_PRODUCT:
      return {
        ...state,
        loading: false,
        products: [action.event, ...state.products],
      };
    case DataActionTypes.GET_PRODUCTS_STARTED:
      return {
        ...state,
        loading: true,
      };
    case DataActionTypes.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case DataActionTypes.GET_PRODUCTS_FAILURE:
      return {
        ...state,
        products: [],
        loading: false,
      };
    default:
      return state;
  }
};
