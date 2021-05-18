import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StageFilterOptions } from "../../models/stage";

interface DiaryPageStage {
  stageFilter: StageFilterOptions;
}

const initialState: DiaryPageStage = { stageFilter: {} };

const diaryPageSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<StageFilterOptions>) {
      state.stageFilter = action.payload;
    },
  },
});

export const { setFilter } = diaryPageSlice.actions;

export default diaryPageSlice;
