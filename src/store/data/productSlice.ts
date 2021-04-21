import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { compareDesc } from "date-fns";
import { forEach } from "lodash";
import { ProcessEnum } from "../../models/process";
import { getAllProducts, Product } from "../../models/product";
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
        const [processId, processType] = key.split("/");
        return {
          label:
            ProcessEnum[processType] +
            processes.find((i) => i.id === processId)?.name,
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
          compareDesc(new Date(from), new Date(item.date)) >= 0 &&
          compareDesc(new Date(to), new Date(item.date)) <= 0
      )
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((item) => {
        const [processId, processType] = item.process.split("/");
        return {
          ...item,
          process:
            ProcessEnum[processType] +
            processes.find((i) => i.id === processId)?.name,
          workshop: workshops.find((i) => i.id === item.workshop)?.name,
          note: item.note || "_",
        };
      });

    return filteredStages;
  }
);
