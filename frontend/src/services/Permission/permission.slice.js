import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import permissionService from "./permission.service";

const initialState = {
  permissions: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const fetch = createAsyncThunk(
  "permission/fetch",
  async (params, thunkAPI) => {
    try {
      return await permissionService.fetch();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const slice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = null;
        state.permissions = action.payload;
      })
      .addCase(fetch.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.permissions = null;
      });
  },
});

export const { reset } = slice.actions;

export default slice.reducer;
