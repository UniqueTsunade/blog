import { createSlice } from "@reduxjs/toolkit";
import { signUpUserThunk } from "./signUpUserThunk";
import { ServerError, SignUpUserState, UserResponse } from "./types";

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
      .addCase(signUpUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null; 
      })
      .addCase(signUpUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ServerError;
        state.data = null; 
      });
  },
});

export default signUpUser.reducer;
