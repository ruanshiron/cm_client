import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from "../../helpers/firebaseHelper";
import { Permission } from "../../models/employee";

interface UserState {
  isLoggedIn: boolean;
  emailVerified: boolean;
  loading: boolean;
  displayName: string;
  email: string;
  uid: string;
  creationTime: string;
  id: string;
  role: "owner" | "workshops" | "customers" | "employees" | "anonymous";
  permissions: Permission[];
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
  permissions: [],
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
    updatePermission: (state, action: PayloadAction<Permission[]>) => {
      state.permissions = action.payload;
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
          ["owner", "workshops", "customers", "employees", "anonymous"].includes(
            action.payload.role
          )
        )
          state.role = action.payload.role;

        if (state.role === "owner") {
          state.permissions = [
            "manage_stage",
            "manage_product",
            "manage_customer",
            "manage_workshop",
            "manage_employee",
            "manage_process",
          ];
        }

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
