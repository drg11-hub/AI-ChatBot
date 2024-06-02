import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import SignUp from "./pages/signup";
import LogIn from "./pages/login";
import ChatMain from "./pages/chat-main";
import Analytics from "./pages/analytics";
import Header from "./components/Header/header";
import { Provider, useDispatch } from 'react-redux';
import store from './helpers/store'; // Adjust the path as necessary
import { restoreSession } from './reducers/authReducer'; // Import the restoreSession action
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  return (
    <Router>
      <div>
        <header>
          <Header />
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/chatmain" element={<ChatMain />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </Router>
  );
};

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;

