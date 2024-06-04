import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../helpers/axiosInstance';

export const fetchMessagesPerDay = createAsyncThunk(
  'analytics/fetchMessagesPerDay',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/analytics/messagesPerDay');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

export const fetchResponseTime = createAsyncThunk(
  'analytics/fetchResponseTime',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/analytics/responseTime');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: {
    messagesPerDay: [],
    responseTimes: [],
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessagesPerDay.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMessagesPerDay.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messagesPerDay = action.payload;
      })
      .addCase(fetchMessagesPerDay.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchResponseTime.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchResponseTime.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.responseTimes = action.payload;
      })
      .addCase(fetchResponseTime.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default analyticsSlice.reducer;
