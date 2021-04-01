import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { onAuthStateChanged, signOut } from "../helpers/firebaseHelper";

interface UserState {
  isLoggedIn: boolean;
  loading: boolean;
  displayName: string;
}

let initialState: UserState = {
  isLoggedIn: false,
  loading: false,
  displayName: "",
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  return await onAuthStateChanged();
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      signOut();
      state.isLoggedIn = false;
      state.displayName = "";
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action: any) => {
      state.loading = false;
      state.isLoggedIn = action.payload ? true : false;
      state.displayName = action.payload?.displayName || "";
      console.log(action.payload);
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
      console.log(action.payload);
    });
  },
});

// export const {} = userSlice.actions;

export default userSlice.reducer;
