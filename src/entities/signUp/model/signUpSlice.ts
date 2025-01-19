import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { signUpUserThunk } from "./signUpUserThunk";
import { SignUpUserState, UserResponse } from "./types";
import { formatAuthError } from "@/shared/utils/handleCustomError";
import { ServerError } from "./types";

const initialState: SignUpUserState = {
  loading: false,
  error: null,
  data: null,
};

export const signUpUser = createSlice({
  name: "signUp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signUpUserThunk.fulfilled,
        (state, action: PayloadAction<UserResponse>) => {
          state.loading = false;
          state.data = action.payload;
          state.error = null;
        }
      )
      .addCase(
        signUpUserThunk.rejected,
        (state, action: PayloadAction<ServerError | undefined>) => {
          state.loading = false;
          state.error = formatAuthError(action, "Failed new user registration");
          state.data = null;
        }
      );
  },
});

export default signUpUser.reducer;
