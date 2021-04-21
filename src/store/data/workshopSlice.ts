import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { filter, forEach } from "lodash";
import { ProcessEnum } from "../../models/process";
import { getAllWorkshops, Workshop } from "../../models/workshop";
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
      (item) => item.workshop === workshopId
    );

    let result: any = {};

    forEach(stagesByWorkshop, (value) => {
      if (`${value.product}/${value.process}` in result) {
        result[`${value.product}/${value.process}`] += value.quantity;
      } else {
        result[`${value.product}/${value.process}`] = value.quantity;
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
          process:
            ProcessEnum[keys[2]] +
            state.processes.find((i) => i.id === keys[1])?.name,
          value: result[key],
        };
      });

    return r;
  }
);

export const stagesByWorkshop = createSelector(
  (state: RootState) => state.stages,
  (state: RootState) => state.products,
  (state: RootState) => state.processes,
  (_state: RootState, workshopId: string) => workshopId,
  (stages, products, processes, workshopId) => {
    const filteredStages = stages
      .filter((item) => item.workshop === workshopId)
      .sort((a, b) => a.date.localeCompare(b.date));

    return filteredStages.map((item) => {
      const [processId, processType] = item.process.split("/");
      return {
        ...item,
        date: item.date,
        product: products.find((i) => i.id === item.product)?.name,
        process:
          ProcessEnum[processType] +
          processes.find((i) => i.id === processId)?.name,
        size: item.size,
        note: item.note || "_",
      };
    });
  }
);
