import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import chatReducer from './chatSlice';
import analyticsReducer from './analyticsSlice'; // Import analytics slice

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  analytics: analyticsReducer, // Add analytics reducer
});

export default rootReducer;
