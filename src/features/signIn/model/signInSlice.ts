import { ServerError } from "@/features/signUp/model/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signInUserThunk } from "./signInUserThunk";
import { UserResponse } from "./types";

interface SignInUserState {
  loading: boolean;
  isAuthorized: boolean;
  error: ServerError | null;
  data: UserResponse | null;
  token: string | null;
}

const initialState: SignInUserState = {
  loading: false,
  isAuthorized: false,
  error: null,
  data: null,
  token: null,
};

export const signInUser = createSlice({
  name: "signIN",
  initialState,
  reducers: {
    restoreSession: (state) => {
      const savedState = sessionStorage.getItem("signInState");
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        state.data = parsedState.data;
        state.token = parsedState.token;
        state.isAuthorized = parsedState.isAuthorized;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUserThunk.pending, (state) => {
        state.loading = true;
        state.isAuthorized = false;
        state.error = null;
      })
      .addCase(signInUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isAuthorized = true;
        state.token = action.payload.user.token; // Сохраняем токен из ответа сервера
        // Сохраняем все данные в sessionStorage
        sessionStorage.setItem(
          "signInState",
          JSON.stringify({
            data: state.data,
            token: state.token,
            isAuthorized: state.isAuthorized,
          })
        );
      })
      .addCase(signInUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.isAuthorized = false;
        state.error = action.payload as ServerError;
        state.data = null;
        state.token = null;
        sessionStorage.removeItem("signInState"); // Удаляем все данные
      });
  },
});

export const { restoreSession } = signInUser.actions;
export default signInUser.reducer;
