import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "lib/utils/userService";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

export const fetchUserLoginStatus = createAsyncThunk(
  "user/fetchUserLoginStatus",
  async (token, { rejectedWithValue }) => {
    try {
      return await userService.checkLoginStatus(token);
    } catch (err) {
      return rejectedWithValue(err.toString());
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchUserLoginStatus.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUserLoginStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserLoginStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
