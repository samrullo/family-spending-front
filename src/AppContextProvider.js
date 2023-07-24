import React from "react";
import { useState } from "react";
import AppContext from "./AppContext";
import { API_BASE_URL, USER_DETAIL_ENDPOINT } from "./components/apiConfig";
import axios from "axios";

const AppContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") !== null
  );
  const [userInfo, setUserInfo] = useState({});

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserInfo({})
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
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const contextValue = {
    isLoggedIn,
    setIsLoggedIn,
    handleLogin,
    handleLogout,
    userInfo,
    fetchAndSetUserInfo,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
