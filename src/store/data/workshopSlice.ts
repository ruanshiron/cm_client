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
import { estimatedSubtotal, processParser, subtotal } from "../../utils/data";
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
        let workshop = state.find((item) => item.id === action.payload.id);
        if (action.payload && !workshop) state.unshift(action.payload);
        if (action.payload && workshop?.id) {
          return state.map((item) =>
            item.id === action.payload.id ? action.payload : item
          );
        }
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
    const filteredStages = (stages[workshopId] || [])
      .slice()
      .sort((a, b) => a.date.localeCompare(b.date));
    const tmp: { [key: string]: any } = {};
    const tmp2: { [key: string]: any } = {};
    const smp: { [key: string]: any } = {};
    forEach(filteredStages, (value) => {
      const subt = subtotal(value, workshop);
      const esub = estimatedSubtotal(value, workshop);
      if (value.productId in tmp) {
        if ("processes" in tmp[value.productId]) {
          if (value.processId in tmp[value.productId].processes) {
            tmp[value.productId]["processes"][value.processId]["subtotal"] +=
              subt;
            tmp[value.productId]["processes"][value.processId][
              "isNotFinished"
            ] =
              tmp[value.productId]["processes"][value.processId][
                "isNotFinished"
              ] || !subt;
            if (
              value.processStatus in
              tmp[value.productId]["processes"][value.processId]
            ) {
              tmp[value.productId]["processes"][value.processId][
                value.processStatus
              ] += value.quantity;
            } else {
              tmp[value.productId]["processes"][value.processId][
                value.processStatus
              ] = value.quantity;
            }
          } else {
            tmp[value.productId]["processes"][value.processId] = {
              [value.processStatus]: value.quantity,
              subtotal: subt,
              isNotFinished: !subt,
            };
          }
        } else {
          tmp[value.productId]["processes"] = {
            [value.processStatus]: value.quantity,
            subtotal: subt,
            isNotFinished: !subt,
          };
        }
      } else {
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

      if (value.productId in tmp2) {
        tmp2[value.productId]["processes"][value.processId][
          value.processStatus
        ]["label"] = value.processLabel;
        tmp2[value.productId]["processes"][value.processId][
          value.processStatus
        ]["value"] += value.quantity;
        tmp2[value.productId]["processes"][value.processId]["subtotal"][
          "value"
        ] += subt;
        tmp2[value.productId]["processes"][value.processId]["subtotal"][
          "estimate"
        ] += esub;
        smp[value.processId]["subtotal"]["isNotFinished"] =
          smp[value.processId]["subtotal"]["isNotFinished"] || !subt;
      } else {
        tmp2[value.productId] = {
          name: value.productName,
          processes: {
            [value.processId]: {
              pending: {
                label:
                  value.processStatus === "pending" ? value.processLabel : "",
                value: value.processStatus === "pending" ? value.quantity : 0,
              },
              fulfilled: {
                label:
                  value.processStatus === "fulfilled" ? value.processLabel : "",
                value: value.processStatus === "fulfilled" ? value.quantity : 0,
              },
              rejected: {
                label:
                  value.processStatus === "rejected" ? value.processLabel : "",
                value: value.processStatus === "rejected" ? value.quantity : 0,
              },
              subtotal: {
                value: subt,
                estimate: esub,
                isNotFinished: !subt,
              },
            },
          },
        };
      }

      if (value.processId in smp) {
        smp[value.processId][value.processStatus]["label"] = value.processLabel;
        smp[value.processId][value.processStatus]["value"] += value.quantity;
        smp[value.processId]["subtotal"]["value"] += subt;
        smp[value.processId]["subtotal"]["estimate"] += esub;
        smp[value.processId]["subtotal"]["isNotFinished"] =
          smp[value.processId]["subtotal"]["isNotFinished"] || !subt;
      } else {
        smp[value.processId] = {
          pending: {
            label: value.processStatus === "pending" ? value.processLabel : "",
            value: value.processStatus === "pending" ? value.quantity : 0,
          },
          fulfilled: {
            label:
              value.processStatus === "fulfilled" ? value.processLabel : "",
            value: value.processStatus === "fulfilled" ? value.quantity : 0,
          },
          rejected: {
            label: value.processStatus === "rejected" ? value.processLabel : "",
            value: value.processStatus === "rejected" ? value.quantity : 0,
          },
          subtotal: {
            value: subt,
            estimate: esub,
            isNotFinished: !subt,
          },
        };
      }
    });

    return {
      stages: filteredStages,
      statistic: tmp2,
      total: smp,
    };
  }
);

export const statisticsForWorkshop = createSelector(
  (state: RootState) => state,
  (_state: RootState, workshopId: string) => workshopId,
  (state, workshopId) => {
    const stagesByWorkshop = filter(
      state.stages.all,
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
  (state: RootState) => state.stages.all,
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
