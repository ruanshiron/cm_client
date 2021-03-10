import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  customerAPI,
  employeeAPI,
  eventAPI,
  materialStoreAPI,
  orderAPI,
  productAPI,
  workshopAPI,
} from "../api";
import {
  Customer,
  Employee,
  Event,
  EventGroup,
  MaterialStore,
  Order,
  Product,
  Workshop,
} from "../models";
import { filter } from "../utils/data";

interface DataState {
  loading: boolean;

  events: Event[];
  products: Product[];
  workshops: Workshop[];
  customers: Customer[];
  employees: Employee[];
  materialStores: MaterialStore[];
  orders: Order[];

  filteredEvents: EventGroup[];
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

  filteredEvents: [],
};

export const fetchEvents = createAsyncThunk(
  "data/fetchEvents",
  async (params, thunkAPI) => {
    return await eventAPI.get();
  }
);

export const fetchProducts = createAsyncThunk(
  "data/fetchProducts",
  async (params, thunkAPI) => {
    return await productAPI.get();
  }
);

export const fetchWorkshops = createAsyncThunk(
  "data/fetchWorkshops",
  async (params, thunkAPI) => {
    return await workshopAPI.get();
  }
);

export const fetchCustomers = createAsyncThunk(
  "data/fetchCustomers",
  async (params, thunkAPI) => {
    return await customerAPI.get();
  }
);

export const fetchMaterialStores = createAsyncThunk(
  "data/fetchMaterialStores",
  async (params, thunkAPI) => {
    return await materialStoreAPI.get();
  }
);

export const fetchEmployees = createAsyncThunk(
  "data/fetchEmployees",
  async (params, thunkAPI) => {
    return await employeeAPI.get();
  }
);

export const fetchOrders = createAsyncThunk(
  "data/fetchOrders",
  async (params, thunkAPI) => {
    return await orderAPI.get();
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
      let events = action.payload as Event[];
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
      state.products = action.payload as Product[];
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
      state.workshops = action.payload as Workshop[];
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
      state.customers = action.payload as Customer[];
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
      state.employees = action.payload as Employee[];
    });
    builder.addCase(fetchEmployees.rejected, (state, action) => {
      state.loading = false;
    });
    

    // MATERIAL STORE
    builder.addCase(fetchMaterialStores.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMaterialStores.fulfilled, (state, action) => {
      state.loading = false;
      state.materialStores = action.payload as MaterialStore[];
    });
    builder.addCase(fetchMaterialStores.rejected, (state, action) => {
      state.loading = false;
    });

    // ORDER
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload as Order[];
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

// export const {} = dataSlice.actions;

export default dataSlice.reducer;
