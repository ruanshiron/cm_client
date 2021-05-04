import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllProcesses, Process } from "../../models/process";
import { RootState } from "../rootReducer";

let initialState: Process[] = [];

export const fetchAllProcesses = createAsyncThunk(
  "processes/fetchAll",
  async (_param, thunkAPI) => {
    const {
      user: { uid },
    } = thunkAPI.getState() as RootState;
    return await getAllProcesses(uid);
  }
);

const processSlice = createSlice({
  name: "processes",
  initialState,
  reducers: {
    removeProcess: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProcesses.fulfilled, (_state, action: any) => {
      return action.payload;
    });
  },
});

export const { removeProcess } = processSlice.actions;

export default processSlice;
