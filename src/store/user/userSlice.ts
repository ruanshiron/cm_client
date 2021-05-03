import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from "../../helpers/firebaseHelper";

interface UserState {
  isLoggedIn: boolean;
  loading: boolean;
  displayName: string;
  email: string;
  uid: string;
}

let initialState: UserState = {
  isLoggedIn: false,
  loading: false,
  displayName: "",
  email: "",
  uid: "",
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  return await onAuthStateChanged();
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: () => {
      firebaseSignOut();
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action: any) => {
        if (!action.payload?.uid) return initialState;

        state.loading = false;
        state.isLoggedIn = action.payload ? true : false;
        state.displayName = action.payload?.displayName || "";
        state.email = action.payload?.email || "";
        state.uid = action.payload?.uid || "";
        // console.log(action.payload);
      })
      .addCase(fetchUser.rejected, () => {
        return initialState;
        // console.log(action.payload);
      });
  },
});

export const { signOut } = userSlice.actions;

export default userSlice.reducer;
