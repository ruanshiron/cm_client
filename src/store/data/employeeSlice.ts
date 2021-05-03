import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllEmployees, Employee } from "../../models/employee";
import { RootState } from "../rootReducer";

let initialState: Employee[] = [];

export const fetchAllEmployees = createAsyncThunk(
  "employees/fetchAll",
  async (_param, thunkAPI) => {
    const {
      user: { uid },
    } = thunkAPI.getState() as RootState;
    return await getAllEmployees(uid);
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllEmployees.fulfilled, (_state, action: any) => {
      return action.payload;
    });
  },
});

export default employeeSlice;
