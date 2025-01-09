import { ServerError } from "@/features/signUp/model/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCurrentUser, signInUserThunk } from "./thunks";
import { UserResponse } from "./types";

interface SignInUserState {
  loading: boolean;
  isAuthorized: boolean;
  isFormSubmitted: boolean;
  error: ServerError | null;
  data: Omit<UserResponse["user"], "token"> | null; 
}

const initialState: SignInUserState = {
  loading: false,
  isAuthorized: false,
  isFormSubmitted: false,
  error: null,
  data: null,
};

export const signInUser = createSlice({
  name: "signIN",
  initialState,
  reducers: {
    resetFormSubmitted: (state) => {
      state.isFormSubmitted = false; 
    },
    restoreSession: (state) => {
      const savedState = sessionStorage.getItem("signInState");
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        state.data = parsedState.data;
        state.isAuthorized = parsedState.isAuthorized;
      }
    },
    clearSession: (state) => {
      state.isAuthorized = false;
      state.data = null;
      sessionStorage.removeItem("signInState");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUserThunk.pending, (state) => {
        state.loading = true;
        state.isAuthorized = false;
        state.isFormSubmitted = false;
        state.error = null;
      })
      .addCase(signInUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        const { token } = action.payload.user;
        state.isAuthorized = true;
        state.isFormSubmitted = true;
        
        sessionStorage.setItem("authToken", token);
      })
      .addCase(signInUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.isAuthorized = false;
        state.isFormSubmitted = false;
        state.error = action.payload as ServerError;
        sessionStorage.removeItem("signInState");
        sessionStorage.removeItem("authToken");
      })

      .addCase(getCurrentUser.pending, (state) => {

      })

      .addCase(getCurrentUser.fulfilled, (state, action) => {
        const { token, ...userData } = action.payload.user;
        state.data = userData;
        state.data = userData; 
        sessionStorage.setItem(
          "signInState",
          JSON.stringify({
            data: userData,
            isAuthorized: true, 
          })
        );
        sessionStorage.setItem("authToken", token);
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.error = action.payload as ServerError;
        state.data = null;
        sessionStorage.removeItem("signInState");
        sessionStorage.removeItem("authToken");
      });
  },
});

export const { restoreSession, resetFormSubmitted, clearSession } = signInUser.actions;
export default signInUser.reducer;
