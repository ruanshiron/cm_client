import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { groupBy } from "lodash";
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


export const reportForProduct = createSelector(
  (state: RootState) => state,
  (_: any, id: string) => id,
  (data, id) => {
    const stages = data.stages.filter((v) => v.product === id);
    const result = groupBy(stages, "process");

    return {
      product: data.products.find((x) => x.id === id),
      data: stages
        .sort((a, b) => a.date?.localeCompare(b.date || "") || 0)
        .map((e) => {
          const [id, type] = e.process?.split("/") || ["", ""];
          return {
            ...e,
            workshop: data.workshops.find((v) => v.id === e.workshop)?.name,
            process:
              ProcessEnum[type] +
              data.processes.find((i) => i.id === id)?.name,
            note: e.note || "_",
          };
        }),
      fields: Object.keys(result).map((key) => {
        const [id, type] = key.split("/");
        return {
          name:
            ProcessEnum[type] +
            data.processes.find((i) => i.id === id)?.name,
          value: result[key].reduce((a, b) => a + (b ? b?.quantity! : 0), 0),
        };
      }),
    };
  }
);
