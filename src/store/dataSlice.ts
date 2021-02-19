import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { eventAPI, productAPI, workshopAPI } from "../api";
import { Event, EventGroup, Product, Workshop } from "../models";
import { filter } from "../utils/data";

interface DataState {
  loading: boolean;
  events: Event[];
  products: Product[];
  workshops: Workshop[];
  filteredEvents: EventGroup[];
}

let initialState: DataState = {
  loading: false,
  events: [],
  products: [],
  workshops: [],
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
  },
});

// export const {} = dataSlice.actions;

export default dataSlice.reducer;
