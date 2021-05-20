import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { forEach } from "lodash";
import { findProduct, getAllProducts, Product } from "../../models/product";
import { processParser } from "../../utils/data";
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

export const findProductById = createAsyncThunk(
  "products/find",
  async (param: string, thunkAPI) => {
    const {
      user: { uid },
    } = thunkAPI.getState() as RootState;
    return await findProduct(uid, param);
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateFromDate(state, action) {
      return state.map((v) =>
        v.id !== action.payload.id
          ? v
          : { ...v, statistic: { ...v.statistic, from: action.payload.from } }
      );
    },
    updateToDate(state, action) {
      return state.map((v) =>
        v.id !== action.payload.id
          ? v
          : { ...v, statistic: { ...v.statistic, to: action.payload.to } }
      );
    },
    removeProduct(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
    addProduct(state, action) {
      return [action.payload, ...state];
    },
    updateProduct(state, action) {
      return state.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.fulfilled, (_state, action: any) => {
        return action.payload;
      })
      .addCase(findProductById.fulfilled, (state, action) => {
        if (action.payload?.id) {
          let product = state.find((item) => item.id === action.payload.id);
          if (action.payload && !product) state.unshift(action.payload);
          if (action.payload && product?.id) {
            return state.map((item) =>
              item.id === action.payload.id ? action.payload : item
            );
          }
        }
      });
  },
});

export default productSlice;

export const {
  removeProduct,
  addProduct,
  updateProduct,
  updateFromDate,
  updateToDate,
} = productSlice.actions;

export const statisticSelector = createSelector(
  (state: RootState) => state.products,
  (state: RootState) => state.processes,
  (_state: RootState, productId: string) => productId,
  (products, processes, productId) => {
    const product = products.find((item) => item.id === productId);
    if (product && product.statistic?.processes) {
      return Object.keys(product.statistic?.processes).map((key) => {
        const data = product.statistic?.processes[key];
        return {
          pending: {
            label:
              processes.find((item) => item.id === key)?.pending ||
              "đang tải...",
            value: data.pending || 0,
          },
          fulfilled: {
            label:
              processes.find((item) => item.id === key)?.fulfilled ||
              "đang tải...",
            value: data.fulfilled || 0,
          },
          rejected: {
            label:
              processes.find((item) => item.id === key)?.rejected ||
              "đang tải...",
            value: data.rejected || 0,
          },
        };
      });
    } else return [];
  }
);

export const statisticHarderSelector = createSelector(
  (state: RootState) => state.stages,
  (state: RootState) => state.processes,
  (_state: RootState, productId: string, from?: string, to?: string) => ({
    productId,
    from,
    to,
  }),
  (stages, processes, { productId, from, to }) => {
    const filteredStages = stages[productId] || [];
    const tmp: { [key: string]: { [key: string]: any } } = {};
    forEach(filteredStages, (value) => {
      if (value.processId in tmp) {
        if (value.processStatus in tmp[value.processId]) {
          tmp[value.processId][value.processStatus] += value.quantity;
        } else {
          tmp[value.processId][value.processStatus] = value.quantity;
        }
      } else {
        tmp[value.processId] = {
          [value.processStatus]: value.quantity,
        };
      }
    });

    return {
      stages: filteredStages,
      statistic: Object.keys(tmp).map((key) => {
        const data = tmp[key];
        return {
          pending: {
            label:
              processes.find((item) => item.id === key)?.pending ||
              "đang tải...",
            value: data.pending || 0,
          },
          fulfilled: {
            label:
              processes.find((item) => item.id === key)?.fulfilled ||
              "đang tải...",
            value: data.fulfilled || 0,
          },
          rejected: {
            label:
              processes.find((item) => item.id === key)?.rejected ||
              "đang tải...",
            value: data.rejected || 0,
          },
        };
      }),
      processesParam: tmp,
    };
  }
);

export const statisticsForProduct = createSelector(
  (state: RootState) => state.stages.all,
  (state: RootState) => state.processes,
  (_state: RootState, productId: string, processId: string) => ({
    productId,
    processId,
  }),
  (stages, processes, { productId, processId }) => {
    const filteredStages = stages.filter(
      (item) =>
        item.productId === productId && item.processId.startsWith(processId)
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
