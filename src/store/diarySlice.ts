import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DiaryState {
  mode: "day" | "all";
}

let initialState: DiaryState = {
  mode: "day",
};

const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<"day" | "all">) => {
      state.mode = action.payload;
    },
  },
});

export const { setMode } = diarySlice.actions;

export default diarySlice.reducer;
