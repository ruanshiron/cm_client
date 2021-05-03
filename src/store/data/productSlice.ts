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
  async (_param, thunkAPI) => {
    const {
      user: { uid },
    } = thunkAPI.getState() as RootState;
    return await getAllProducts(uid);
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
      (item) => item.productId === productId && item.processId.startsWith(processId)
    );

    const tmp: any = {};

    forEach(filteredStages, (value) => {
      if (value.processId in tmp) {
        tmp[value.processId] += value.quantity;
      } else {
        tmp[value.processId] = value.quantity;
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
          item.productId === productId &&
          item.processId.startsWith(processId) &&
          isBetween(item.date, from, to)
      )
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((item) => {
        return {
          ...item,
          process: processParser(item.processId, processes),
          workshop: workshops.find((i) => i.id === item.workshopId)?.name,
          note: item.note || "_",
        };
      });

    return filteredStages;
  }
);
