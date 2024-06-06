import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../helpers/axiosInstance';

// Async thunk for creating a chat session
export const createChatSession = createAsyncThunk(
  'chat/createChatSession',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/chat/session');
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for sending a message
export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (messageData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/chat/session/${messageData.chatSessionId}/message`, messageData);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching chat history
export const fetchChatHistory = createAsyncThunk(
  'chat/fetchChatHistory',
  async (sessionId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/chat/session/${sessionId}`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching all chat sessions
export const fetchChatSessions = createAsyncThunk(
  'chat/fetchChatSessions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/chat/sessions');
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    sessions: [],
    messages: [],
    currentSession: null,
    isTyping: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    setCurrentSession: (state, action) => {
      state.currentSession = action.payload;
    },
    setIsTyping: (state, action) => {
      state.isTyping = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChatSession.fulfilled, (state, action) => {
        state.sessions.unshift(action.payload);
      })
      .addCase(fetchChatSessions.fulfilled, (state, action) => {
        state.sessions = action.payload;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(sendMessage.pending, (state) => {
        state.isTyping = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { userMessage, botMessage, session } = action.payload;

        // Update session's initial query if it's not already set
        const existingSession = state.sessions.find(s => s._id === session._id);
        if (existingSession && !existingSession.initialQuery) {
          existingSession.initialQuery = session.initialQuery;
        }

        state.messages.push(userMessage);
        state.messages.push(botMessage);
        state.isTyping = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.payload;
        state.isTyping = false;
      });
  },
});

export const { setCurrentSession, setIsTyping } = chatSlice.actions;
export default chatSlice.reducer;

// --------- google signup code: