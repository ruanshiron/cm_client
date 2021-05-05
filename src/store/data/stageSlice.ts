import {
  AnyAction,
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { findStage, getAllStages, Stage } from "../../models/stage";
import { filter } from "../../utils/data";
import { RootState } from "../rootReducer";

const initialState: Stage[] = [];

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
      return state.filter((item) => item.id !== action.payload);
    },
    addStage: (state, action: PayloadAction<Stage>) => {
      state.unshift(action.payload);
    },
    updateStage: (state, action: PayloadAction<Stage>) => {
      return state.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStages.fulfilled, (_state, action: AnyAction) => {
        return action.payload;
      })
      .addCase(findStageById.fulfilled, (state, action: AnyAction) => {
        if (action.payload) state.unshift(action.payload);
      });
  },
});

export const { addStage, removeStage, updateStage } = stageSlice.actions;

export default stageSlice;

export const filteredStages = createSelector(
  (state: RootState) => state.stages,
  (stages) => {
    return filter(stages);
  }
);
