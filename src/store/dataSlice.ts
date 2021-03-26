import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as Customer from "../models/customer";
import * as Workshop from "../models/workshop";
import * as Supplier from "../models/supplier";
import * as Employee from "../models/employee";
import * as Product from "../models/product";
import * as Process from "../models/process";
import * as Event from "../models/event";
import * as Order from "../models/order";
import { filter } from "../utils/data";

interface DataState {
  loading: boolean;

  events: Event.Skeleton[];
  products: Product.Skeleton[];
  workshops: Workshop.Skeleton[];
  customers: Customer.Skeleton[];
  employees: Employee.Skeleton[];
  materialStores: Supplier.Skeleton[];
  orders: Order.Skeleton[];
  processes: Process.Skeleton[];

  filteredEvents: Event.Group[];
}

let initialState: DataState = {
  loading: false,

  events: [],
  products: [],
  workshops: [],
  customers: [],
  employees: [],
  materialStores: [],
  orders: [],
  processes: [],

  filteredEvents: [],
};

export const fetchEvents = createAsyncThunk(
  "data/fetchEvents",
  async (params, thunkAPI) => {
    return await Event.get();
  }
);

export const fetchProducts = createAsyncThunk(
  "data/fetchProducts",
  async (params, thunkAPI) => {
    return await Product.get();
  }
);

export const fetchWorkshops = createAsyncThunk(
  "data/fetchWorkshops",
  async (params, thunkAPI) => {
    return await Workshop.get();
  }
);

export const fetchCustomers = createAsyncThunk(
  "data/fetchCustomers",
  async (params, thunkAPI) => {
    return await Customer.get();
  }
);

export const fetchSuppliers = createAsyncThunk(
  "data/fetchSuppliers",
  async (params, thunkAPI) => {
    return await Supplier.get();
  }
);

export const fetchEmployees = createAsyncThunk(
  "data/fetchEmployees",
  async (params, thunkAPI) => {
    return await Employee.get();
  }
);

export const fetchOrders = createAsyncThunk(
  "data/fetchOrders",
  async (params, thunkAPI) => {
    return await Order.get();
  }
);

export const fetchProcesses = createAsyncThunk(
  "data/fetchProcesses",
  async (params, thunkAPI) => {
    return await Process.get();
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // EVENT
    builder.addCase(fetchEvents.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.loading = false;
      let events = action.payload as Event.Skeleton[];
      state.events = events;
      state.filteredEvents = filter(events);
    });
    builder.addCase(fetchEvents.rejected, (state, action) => {
      state.loading = false;
    });

    // PRODUCT
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload as Product.Skeleton[];
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
    });

    // WORKSHOP
    builder.addCase(fetchWorkshops.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchWorkshops.fulfilled, (state, action) => {
      state.loading = false;
      state.workshops = action.payload as Workshop.Skeleton[];
    });
    builder.addCase(fetchWorkshops.rejected, (state, action) => {
      state.loading = false;
    });

    // CUSTOMER
    builder.addCase(fetchCustomers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      state.loading = false;
      state.customers = action.payload as Customer.Skeleton[];
    });
    builder.addCase(fetchCustomers.rejected, (state, action) => {
      state.loading = false;
    });

    // EMPLOYEE
    builder.addCase(fetchEmployees.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      state.loading = false;
      state.employees = action.payload as Employee.Skeleton[];
    });
    builder.addCase(fetchEmployees.rejected, (state, action) => {
      state.loading = false;
    });

    // MATERIAL STORE
    builder.addCase(fetchSuppliers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSuppliers.fulfilled, (state, action) => {
      state.loading = false;
      state.materialStores = action.payload as Supplier.Skeleton[];
    });
    builder.addCase(fetchSuppliers.rejected, (state, action) => {
      state.loading = false;
    });

    // ORDER
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload as Order.Skeleton[];
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.loading = false;
    });

    // PROCESS
    builder.addCase(fetchProcesses.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProcesses.fulfilled, (state, action) => {
      state.loading = false;
      state.processes = action.payload as Process.Skeleton[];
    });
    builder.addCase(fetchProcesses.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

// export const {} = dataSlice.actions;

export default dataSlice.reducer;
