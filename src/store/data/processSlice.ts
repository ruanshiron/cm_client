import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProcesses, Process } from "../../models/process";

let initialState: Process[] = [];

export const fetchAllProcesses = createAsyncThunk(
  "processes/fetchAll",
  async () => {
    return await getAllProcesses();
  }
);

const processSlice = createSlice({
  name: "processes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProcesses.fulfilled, (_state, action: any) => {
      return action.payload;
    });
  },
});

export default processSlice;
