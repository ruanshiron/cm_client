import { AnyAction, AsyncThunk, createSlice } from "@reduxjs/toolkit";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

function isSaveFulfilledAction(action: AnyAction): action is FulfilledAction {
  return action.type.endsWith("save/fulfilled");
}

function isSaveRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith("save/rejected");
}

function isRemoveFulfilledAction(action: AnyAction): action is FulfilledAction {
  return action.type.endsWith("remove/fulfilled");
}

function isRemoveRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith("remove/rejected");
}

interface ToastState {
  messages: string;
  color?: "success" | "warning" | "danger" | "";
}

const initialState: ToastState[] = [];

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isSaveFulfilledAction, (state, _action) => {
        state.unshift({ messages: "Lưu thành công!" });
      })
      .addMatcher(isSaveRejectedAction, (state, _action) => {
        state.unshift({
          messages: "Có lỗi xảy ra, vui lòng thử lại!",
          color: "warning",
        });
      })
      .addMatcher(isRemoveFulfilledAction, (state, _action) => {
        state.unshift({ messages: "Xóa thành công!" });
      })
      .addMatcher(isRemoveRejectedAction, (state, _action) => {
        state.unshift({
          messages: "Có lỗi xảy ra, vui lòng thử lại!",
          color: "warning",
        });
      });
  },
});

export default toastSlice;
