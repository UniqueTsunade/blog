import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServerError, UpdateProfileState } from "./types";
import { updateUser } from "./updateUserThunk";
import { formatAuthError } from "@/shared/utils/handleCustomError";
import { Status } from "@/shared/lib/types/sliceTypes";

const initialState: UpdateProfileState = {
  status: Status.IDLE,
  error: null,
  data: null,
};

export const updateUserProfile = createSlice({
  name: "updateUserProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.data = action.payload;
      })
      .addCase(
        updateUser.rejected,
        (state, action: PayloadAction<ServerError | undefined>) => {
          state.status = Status.ERROR;
          state.error = formatAuthError(
            action,
            "Unsuccessful user profile update"
          );
          state.data = null;
        }
      );
  },
});

export default updateUserProfile.reducer;
