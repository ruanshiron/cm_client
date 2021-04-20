import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllEmployees, Employee } from "../../models/employee";

let initialState: Employee[] = [];

export const fetchAllEmployees = createAsyncThunk(
  "employees/fetchAll",
  async () => {
    return await getAllEmployees();
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
