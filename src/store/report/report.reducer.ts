import { ReportActions, ReportActionTypes } from "./report.actions";
import { ReportState } from "./report.state";

const initialReportState: ReportState = {
  products: [],
  loading: false,
};

export const reportReducer = (
  state: ReportState = initialReportState,
  action: ReportActions
): ReportState => {
  switch (action.type) {
    case ReportActionTypes.ADD_PRODUCT:
      return {
        ...state,
        loading: false,
        products: [action.event, ...state.products],
      };
    case ReportActionTypes.GET_PRODUCTS_STARTED:
      return {
        ...state,
        loading: true,
      };
    case ReportActionTypes.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case ReportActionTypes.GET_PRODUCTS_FAILURE:
      return {
        ...state,
        products: [],
        loading: false,
      };
    default:
      return state;
  }
};
