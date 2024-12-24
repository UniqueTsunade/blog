import { createSlice } from "@reduxjs/toolkit";
import { UserResponse } from "./types";
import { updateUser } from "./editProfileThunk";

interface EditProfileState {
    data: UserResponse

}

const initialState: EditProfileState = {
    data: null
}

export const editProfile = createSlice({
    name: "editProfile",
    initialState,
    reducers: {
    },
      extraReducers: (builder) => {
        builder
          .addCase(updateUser.pending, (state) => {

          })
          .addCase(updateUser.fulfilled, (state, action) => {
            state.data = action.payload;
          })
          .addCase(updateUser.rejected, (state, action) => {
          });
      },
})

export default editProfile.reducer;