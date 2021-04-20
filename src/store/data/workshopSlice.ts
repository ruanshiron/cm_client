import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllWorkshops, Workshop } from "../../models/workshop";

let initialState: Workshop[] = [];

export const fetchAllWorkshops = createAsyncThunk(
  "workshops/fetchAll",
  async () => {
    return await getAllWorkshops();
  }
);

const workshopSlice = createSlice({
  name: "workshops",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllWorkshops.fulfilled, (_state, action: any) => {
      return action.payload;
    });
  },
});

export default workshopSlice;
