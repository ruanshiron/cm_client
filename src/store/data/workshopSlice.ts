import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { chain, filter, forEach } from "lodash";
import { getAllWorkshops, Workshop } from "../../models/workshop";
import { processParser } from "../../utils/data";
import { RootState } from "../rootReducer";

let initialState: Workshop[] = [];

export const fetchAllWorkshops = createAsyncThunk(
  "workshops/fetchAll",
  async () => {
    return await getAllWorkshops();
  }
);

const workshopSlice = createSlice({
  name: "workshops",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllWorkshops.fulfilled, (_state, action: any) => {
      return action.payload;
    });
  },
});

export default workshopSlice;

export const statisticsForWorkshop = createSelector(
  (state: RootState) => state,
  (_state: RootState, workshopId: string) => workshopId,
  (state, workshopId) => {
    const stagesByWorkshop = filter(
      state.stages,
      (item) => item.workshopId === workshopId
    );

    let result: any = {};

    forEach(stagesByWorkshop, (value) => {
      if (`${value.productId}/${value.processId}` in result) {
        result[`${value.productId}/${value.processId}`] += value.quantity;
      } else {
        result[`${value.productId}/${value.processId}`] = value.quantity;
      }
    });

    const r: {
      product?: string;
      process?: string;
      value: number;
    }[] = Object.keys(result)
      .sort()
      .map((key) => {
        const keys = key.split("/");
        return {
          product: state.products.find((item) => item.id === keys[0])?.name,
          process: processParser(keys[1] + "/" + keys[2], state.processes),
          value: result[key],
        };
      });

    return r;
  }
);

export const statisticsForWorkshopAndGroupByProduct = createSelector(
  (state: any[]) => state,
  (state) =>
    chain(state)
      .groupBy("product")
      .map((value, key) => ({ product: key, statistics: value }))
      .value()
);

export const stagesByWorkshop = createSelector(
  (state: RootState) => state.stages,
  (state: RootState) => state.products,
  (state: RootState) => state.processes,
  (_state: RootState, workshopId: string) => workshopId,
  (stages, products, processes, workshopId) => {
    const filteredStages = stages
      .filter((item) => item.workshopId === workshopId)
      .sort((a, b) => a.date.localeCompare(b.date));

    return filteredStages.map((item) => {
      return {
        ...item,
        date: item.date,
        product: products.find((i) => i.id === item.productId)?.name,
        process: processParser(item.processId, processes),
        size: item.productSize,
        note: item.note || "_",
      };
    });
  }
);
