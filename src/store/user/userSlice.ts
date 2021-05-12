import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from "../../helpers/firebaseHelper";

interface UserState {
  isLoggedIn: boolean;
  emailVerified: boolean;
  loading: boolean;
  displayName: string;
  email: string;
  uid: string;
  creationTime: string;
  id: string;
  role: "owner" | "workshop" | "customer" | "employee" | "anonymous";
}

let initialState: UserState = {
  isLoggedIn: false,
  loading: false,
  emailVerified: false,
  displayName: "",
  email: "",
  creationTime: "",
  uid: "",
  id: "",
  role: "anonymous",
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
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<any>) => {
        if (!action.payload?.uid) return initialState;

        state.loading = false;
        state.isLoggedIn = action.payload ? true : false;
        state.displayName = action.payload.displayName || "";
        state.email = action.payload.email || "";
        state.creationTime = action.payload.creationTime || "";
        state.emailVerified = !!action.payload.emailVerified;
        state.uid = action.payload.uid || "";
        state.id = action.payload.id || action.payload?.uid || "";
        if (
          ["owner", "workshop", "customer", "employee", "anonymous"].includes(
            action.payload.role
          )
        )
          state.role = action.payload.role;
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
