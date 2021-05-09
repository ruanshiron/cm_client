import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { chain, filter, forEach } from "lodash";
import {
  Amount,
  findWorkshop,
  getAllWorkshops,
  Workshop,
} from "../../models/workshop";
import { processParser, subtotal } from "../../utils/data";
import { isBetween } from "../../utils/date";
import { RootState } from "../rootReducer";

let initialState: Workshop[] = [];

export const fetchAllWorkshops = createAsyncThunk(
  "workshops/fetchAll",
  async (_param, thunkAPI) => {
    const {
      user: { uid },
    } = thunkAPI.getState() as RootState;
    return await getAllWorkshops(uid);
  }
);

export const findWorkshopById = createAsyncThunk(
  "workshops/find",
  async (param: string, thunkAPI) => {
    const {
      user: { uid },
    } = thunkAPI.getState() as RootState;
    return await findWorkshop(uid, param);
  }
);

const workshopSlice = createSlice({
  name: "workshops",
  initialState,
  reducers: {
    removeWorkshop: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item.id !== action.payload);
    },
    addWorkshop: (state, action: PayloadAction<Workshop>) => {
      state.unshift(action.payload);
    },
    updateWorkshop: (state, action: PayloadAction<Workshop>) => {
      return state.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
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
    updateWorkshopCode: (
      state,
      action: PayloadAction<{ id: string; code: string }>
    ) => {
      const item = state.find((item) => item.id === action.payload.id);
      if (item) item.code = action.payload.code;
    },
    addAmount: (
      state,
      action: PayloadAction<{ id: string; amount: Amount }>
    ) => {
      const item = state.find((item) => item.id === action.payload.id);
      item?.amounts.push(action.payload.amount);
    },
    removeAmount: (
      state,
      action: PayloadAction<{ id: string; index: number }>
    ) => {
      // const item = state.find((item) => item.id === action.payload.id);
      // item?.amounts.splice(action.payload.index, 1);
      return state.map((item) =>
        item.id !== action.payload.id
          ? item
          : {
              ...item,
              amounts: item.amounts.filter(
                (_i, index) => index !== action.payload.index
              ),
            }
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllWorkshops.fulfilled, (_state, action: any) => {
        return action.payload;
      })
      .addCase(findWorkshopById.fulfilled, (state, action) => {
        if (action.payload) state.unshift(action.payload);
      });
  },
});

export const {
  addWorkshop,
  updateWorkshop,
  addAmount,
  removeAmount,
  removeWorkshop,
  updateWorkshopCode,
  updateFromDate,
  updateToDate,
} = workshopSlice.actions;

export default workshopSlice;

export const statisticHarderSelector = createSelector(
  (state: RootState) => state.stages,
  (state: RootState) => state.workshops,
  (_state: RootState, workshopId: string, from?: string, to?: string) => ({
    workshopId,
    from,
    to,
  }),
  (stages, workshops, { workshopId }) => {
    const workshop = workshops.find((item) => item.id === workshopId);
    const filteredStages = stages
      .filter(
        (item) =>
          item.workshopId === workshopId &&
          isBetween(
            item.date,
            workshop?.statistic?.from,
            workshop?.statistic?.to
          )
      )
      .sort((a, b) => a.date.localeCompare(b.date));
    const tmp: { [key: string]: any } = {};
    forEach(filteredStages, (value) => {
      if (value.productId in tmp) {
        if ("processes" in tmp[value.productId]) {
          if (value.processId in tmp[value.productId].processes) {
            const subt = subtotal(value, workshop);
            tmp[value.productId]["processes"][value.processId][
              "subtotal"
            ] += subt;
            tmp[value.productId]["processes"][value.processId]["isNotFinished"] =
              tmp[value.productId]["processes"][value.processId][
                "isNotFinished"
              ] || !subt;
            if (value.processStatus in tmp[value.productId]["processes"][value.processId]) {
              tmp[value.productId]["processes"][value.processId][
                value.processStatus
              ] += value.quantity;
            } else {
              tmp[value.productId]["processes"][value.processId][
                value.processStatus
              ] = value.quantity;
            }
            
          } else {
            const subt = subtotal(value, workshop);
            tmp[value.productId]["processes"][value.processId] = {
              [value.processStatus]: value.quantity,
              subtotal: subt,
              isNotFinished: !subt,
            };
          }
        } else {
          const subt = subtotal(value, workshop);
          tmp[value.productId]["processes"] = {
            [value.processStatus]: value.quantity,
            subtotal: subt,
            isNotFinished: !subt,
          };
        }
      } else {
        const subt = subtotal(value, workshop);
        tmp[value.productId] = {
          name: value.productName,
          processes: {
            [value.processId]: {
              [value.processStatus]: value.quantity,
              subtotal: subt,
              isNotFinished: !subt,
            },
          },
        };
      }
    });

    return {
      stages: filteredStages,
      statistic: tmp,
    };
  }
);

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
