import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { getCurrentUser, signInUserThunk } from "./signInThunks";
import { ServerError, UserResponse } from "./types";
import { formatAuthError } from "@/shared/utils/handleCustomError";

interface SignInUserState {
  loading: boolean;
  isAuthorized: boolean;
  isFormSubmitted: boolean;
  error: string | null;
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
  name: "signIn",
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUserThunk.pending, (state) => {
        state.loading = true;
        state.isAuthorized = false;
        state.isFormSubmitted = false;
        state.error = null;
      })
      .addCase(
        signInUserThunk.fulfilled,
        (state, action: PayloadAction<UserResponse>) => {
          state.loading = false;
          const { token } = action.payload.user;
          state.isAuthorized = true;
          state.isFormSubmitted = true;
          sessionStorage.setItem("authToken", token);
        }
      )
      .addCase(
        signInUserThunk.rejected,
        (state, action: PayloadAction<ServerError | undefined>) => {
          state.loading = false;
          state.isAuthorized = false;
          state.isFormSubmitted = false;
          state.error = formatAuthError(action, "Failed login attempt");
          sessionStorage.removeItem("signInState");
          sessionStorage.removeItem("authToken");
        }
      )
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getCurrentUser.fulfilled,
        (state, action: PayloadAction<UserResponse>) => {
          state.loading = false;
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
        }
      )
      .addCase(
        getCurrentUser.rejected,
        (state, action: PayloadAction<ServerError | undefined>) => {
          state.loading = false;
          state.error = formatAuthError(
            action,
            "Failed to get currently logged in user"
          );
          state.data = null;
          sessionStorage.removeItem("signInState");
          sessionStorage.removeItem("authToken");
        }
      );
  },
});

export const { restoreSession, resetFormSubmitted, clearSession } =
  signInUser.actions;
export default signInUser.reducer;
