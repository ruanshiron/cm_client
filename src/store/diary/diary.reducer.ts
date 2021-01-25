import { DiaryActions, DiaryActionTypes } from "./diary.actions";
import { DiaryState } from "./diary.state";

const initialDiaryState: DiaryState = {
  events: [],
  groups: [],
  loading: false,
};

export const diaryReducer = (
  state: DiaryState = initialDiaryState,
  action: DiaryActions
): DiaryState => {
  switch (action.type) {
    case DiaryActionTypes.ADD_EVENT:
      return {
        ...state,
        loading: false,
        events: [action.payload, ...state.events],
      };
    case DiaryActionTypes.GET_EVENTS_STARTED:
      return {
        ...state,
        loading: true,
      };
    case DiaryActionTypes.GET_EVENTS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case DiaryActionTypes.GET_EVENTS_FAILURE:
      return {
        ...state,
        events: [],
        loading: false,
      };
    default:
      return state;
  }
};
