import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import noteService from "./noteService";
import { transformError } from "../../helpers/errorHandler";

const initialState = {
  notes: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getNotes = createAsyncThunk(
  "notes/getNotes",
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.getNotes(ticketId, token);
    } catch (error) {
      const message = transformError(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getNotes.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = payload;
      })
      .addCase(getNotes.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      });
  },
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
