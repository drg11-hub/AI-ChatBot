import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import chatReducer from './chatSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
});

export default rootReducer;
