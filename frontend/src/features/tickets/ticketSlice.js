import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { transformError } from "../../helpers/errorHandler";
import ticketService from "./ticketService";

const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createTicket = createAsyncThunk(
  "tickets/createTicket",
  async (ticketData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.createTicket(ticketData, token);
    } catch (error) {
      const message = transformError(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTickets = createAsyncThunk(
  "tickets/getTickets",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.getTickets(token);
    } catch (error) {
      const message = transformError(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTicket = createAsyncThunk(
  "tickets/getTicket",
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.getTicket(ticketId, token);
    } catch (error) {
      const message = transformError(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const closeTicket = createAsyncThunk(
  "tickets/closeTicket",
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.closeTicket(ticketId, token);
    } catch (error) {
      const message = transformError(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createTicket.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getTickets.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets = payload;
      })
      .addCase(getTickets.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(getTicket.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getTicket.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ticket = payload;
      })
      .addCase(getTicket.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(closeTicket.rejected, (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
        state.tickets.map((ticket) =>
          ticket._id === payload._id ? (ticket.status = "closed") : ticket
        );
      });
  },
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
