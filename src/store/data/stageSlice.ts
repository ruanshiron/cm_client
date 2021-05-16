import {
  AnyAction,
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  findStage,
  getAllStages,
  getStages,
  Stage,
  StageFilterOptions,
} from "../../models/stage";
import { filter } from "../../utils/data";
import { RootState } from "../rootReducer";

const initialState: { all: Stage[]; [key: string]: Stage[] } = { all: [] };

export const fetchStages = createAsyncThunk(
  "stages/fetch",
  async (param: StageFilterOptions, thunkAPI) => {
    const {
      user: { uid },
    } = thunkAPI.getState() as RootState;
    return await getStages(uid, param);
  }
);

export const fetchAllStages = createAsyncThunk(
  "stages/fetchAll",
  async (_param, thunkAPI) => {
    const {
      user: { uid },
    } = thunkAPI.getState() as RootState;
    return await getAllStages(uid);
  }
);

export const findStageById = createAsyncThunk(
  "stages/find",
  async (param: string, thunkAPI) => {
    const {
      user: { uid },
    } = thunkAPI.getState() as RootState;
    return await findStage(uid, param);
  }
);

const stageSlice = createSlice({
  name: "stages",
  initialState,
  reducers: {
    removeStage: (state, action) => {
      state.all = state.all.filter((item) => item.id !== action.payload);
    },
    addStage: (state, action: PayloadAction<Stage>) => {
      let stage = state.all.find((item) => item.id === action.payload.id);
      if (stage) {
        stage = action.payload;
      } else {
        state.all.unshift(action.payload);
      }
    },
    updateStage: (state, action: PayloadAction<Stage>) => {
      state.all = state.all.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    resetAllStages: (state) => {
      state.all = [];
    },
    addStatisticStages: (
      state,
      action: PayloadAction<{ id: string; stages: Stage[] }>
    ) => {
      state[action.payload.id] = action.payload.stages;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStages.fulfilled, (state, action: AnyAction) => {
        state.all = action.payload;
      })
      .addCase(findStageById.fulfilled, (state, action: AnyAction) => {
        if (action.payload) state.all.unshift(action.payload);
      })
      .addCase(fetchStages.fulfilled, (state, action: AnyAction) => {
        if (action.payload) state.all = state.all.concat(action.payload);
      });
  },
});

export const { addStage, removeStage, updateStage, resetAllStages, addStatisticStages } =
  stageSlice.actions;

export default stageSlice;

export const filteredStages = createSelector(
  (state: RootState) => state.stages.all,
  (stages) => {
    return filter(stages);
  }
);

export const stageOrderByTimestampSelector = createSelector(
  (state: RootState) => state.stages.all,
  (stages) => {
    return stages.slice().sort((a, b) => b.date.localeCompare(a.date));
  }
);
