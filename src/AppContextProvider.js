import React from "react";
import { useState } from "react";
import AppContext from "./AppContext";
import {
  API_BASE_URL,
  USER_DETAIL_ENDPOINT,
} from "./components/APIUtils/ApiEndpoints";
import axios from "axios";

const AppContextProvider = ({ children }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [isSuccessfull, setIsSuccessfull] = useState(false);
  const [flashMessages, setFlashMessages] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") !== null
  );
  const [userInfo, setUserInfo] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsAuthenticated(false);
    setUserInfo({});
  };

  const fetchAndSetUserInfo = () => {
    axios
      .get(`${API_BASE_URL}${USER_DETAIL_ENDPOINT}`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(`Received user detail : ${response.data}`);
        setUserInfo(response.data);
        setIsAuthenticated(true); // Set to true when valid user data is received
      })
      .catch((error) => {
        console.error(error);
        setIsAuthenticated(false); // Set to false in case of an error
      });
  };

  const contextValue = {
    isLoggedIn,
    isAuthenticated,
    setIsLoggedIn,
    handleLogin,
    handleLogout,
    userInfo,
    fetchAndSetUserInfo,
    isSpinning,
    setIsSpinning,
    isSuccessfull,
    setIsSuccessfull,
    flashMessages,
    setFlashMessages,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
