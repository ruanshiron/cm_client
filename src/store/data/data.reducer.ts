import { DispatchObject } from "../../utils/types";
import { ACTIONS } from "../action.types";
import { DataActionTypes } from "./data.actions";
import { DataState } from "./data.state";

const initialDiaryState: DataState = {
  events: [],
  filteredEvents: [],
  products: [],
  loading: false,
};

export const dataReducer = (
  state: DataState = initialDiaryState,
  action: DispatchObject
): DataState => {
  switch (action.type) {
    case DataActionTypes.ADD_EVENT:
      return {
        ...state,
        loading: false,
        events: [action.payload, ...state.events],
      };
    case ACTIONS.DATA.EVENT.GET.STARTED:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS.DATA.EVENT.GET.SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case ACTIONS.DATA.EVENT.GET.FAILURE:
      return {
        ...state,
        events: [],
        loading: false,
      };
    case ACTIONS.DATA.PRODUCT.GET.STARTED:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS.DATA.PRODUCT.GET.SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case ACTIONS.DATA.PRODUCT.GET.FAILURE:
      return {
        ...state,
        products: [],
        loading: false,
      };
    case ACTIONS.DATA.PRODUCT.SAVE.STARTED:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS.DATA.PRODUCT.SAVE.SUCCESS:
      return {
        ...state,
        products: [action.payload, ...state.products],
        loading: false,
      };
    case ACTIONS.DATA.PRODUCT.SAVE.FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
