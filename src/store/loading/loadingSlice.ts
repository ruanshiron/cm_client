import {
  AnyAction,
  AsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { includes } from "lodash";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.endsWith("/pending");
}

function isFulfilledAction(action: AnyAction): action is FulfilledAction {
  return action.type.endsWith("/fulfilled");
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith("/rejected");
}

interface LoadingState {
  isLoading: boolean;
  [key: string]: string | boolean;
}

const initialState: LoadingState = { isLoading: false };

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPendingAction, (state, action) => {
        state[action.meta.requestId] = "pending";
        state["isLoading"] = includes(state, "pending");
      })
      .addMatcher(isFulfilledAction, (state, action) => {
        state[action.meta.requestId] = "fulfilled";
        state["isLoading"] = includes(state, "pending");
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state[action.meta.requestId] = "rejected";
        state["isLoading"] = includes(state, "pending");
      });
  },
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice;
