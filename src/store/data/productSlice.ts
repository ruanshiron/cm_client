import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { forEach } from "lodash";
import { getAllProducts, Product } from "../../models/product";
import { processParser } from "../../utils/data";
import { isBetween } from "../../utils/date";
import { RootState } from "../rootReducer";

let initialState: Product[] = [];

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    return await getAllProducts();
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateFromDateProductReport(state, action) {
      const product = state.find((v) => v.id === action.payload.id);

      if (product && product.report_cache) {
        product.report_cache.to = action.payload;
      }
    },
    updateToDateProductReport(state, action) {
      const product = state.find((v) => v.id === action.payload.id);

      if (product && product.report_cache) {
        product.report_cache.from = action.payload;
      }
    },
    updateForProductReport(state, action) {
      const product = state.find((v) => v.id === action.payload.id);

      if (product && product.report_cache) {
        product.report_cache.for = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.fulfilled, (_state, action: any) => {
      return action.payload;
    });
  },
});

export default productSlice;

export const statisticsForProduct = createSelector(
  (state: RootState) => state.stages,
  (state: RootState) => state.processes,
  (_state: RootState, productId: string, processId: string) => ({
    productId,
    processId,
  }),
  (stages, processes, { productId, processId }) => {
    const filteredStages = stages.filter(
      (item) => item.product === productId && item.process.startsWith(processId)
    );

    const tmp: any = {};

    forEach(filteredStages, (value) => {
      if (value.process in tmp) {
        tmp[value.process] += value.quantity;
      } else {
        tmp[value.process] = value.quantity;
      }
    });

    const statistics: { label: string; value: number }[] = Object.keys(tmp).map(
      (key) => {
        return {
          label: processParser(key, processes),
          value: tmp[key],
        };
      }
    );

    return statistics;
  }
);

export const stagesByProductAndProcess = createSelector(
  (state: RootState) => state.stages,
  (state: RootState) => state.processes,
  (state: RootState) => state.workshops,
  (
    _state: RootState,
    productId: string,
    processId: string,
    from: string,
    to: string
  ) => ({
    productId,
    processId,
    from,
    to,
  }),
  (stages, processes, workshops, { productId, processId, from, to }) => {
    const filteredStages = stages
      .filter(
        (item) =>
          item.product === productId &&
          item.process.startsWith(processId) &&
          isBetween(item.date, from, to)
      )
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((item) => {
        return {
          ...item,
          process: processParser(item.process, processes),
          workshop: workshops.find((i) => i.id === item.workshop)?.name,
          note: item.note || "_",
        };
      });

    return filteredStages;
  }
);
