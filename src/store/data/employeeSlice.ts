import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  reducers: {
    removeEmployee: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.unshift(action.payload);
    },
    updateEmployee: (state, action: PayloadAction<Employee>) => {
      return state.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllEmployees.fulfilled, (_state, action: any) => {
      return action.payload;
    });
  },
});

export const {
  removeEmployee,
  addEmployee,
  updateEmployee,
} = employeeSlice.actions;

export default employeeSlice;
