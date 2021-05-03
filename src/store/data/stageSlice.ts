import {
  AnyAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { getAllStages, Stage } from "../../models/stage";
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

const stageSlice = createSlice({
  name: "stages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllStages.fulfilled, (_state, action: AnyAction) => {
      return action.payload;
    });
  },
});

export default stageSlice;

export const filteredStages = createSelector(
  (state: RootState) => state.stages,
  (stages) => {
    return filter(stages);
  }
);
