import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { API_BASE_URL, LOGIN_ENDPOINT } from "./APIUtils/ApiEndpoints";
import { useContext } from "react";
import AppContext from "../AppContext";
import { getCookie } from "./APIUtils/get_csrf";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiError, setAPIError] = useState("");

  const { isLoggedIn, handleLogin, fetchAndSetUserInfo, userInfo } =
    useContext(AppContext);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const csrf_token = getCookie("csrftoken");
      const response = await axios.post(
        `${API_BASE_URL}${LOGIN_ENDPOINT}`,
        {
          username: username,
          password: password,
        },
        {
          "X-CSRFToken": csrf_token,
        }
      );
      console.log(`response.data : ${response.data}`);
      //localStorage.setItem("token", response.data.key);
      handleLogin(response.data.key);
      console.log(
        `Login was successfull. received key ${localStorage.getItem("token")}`
      );

      fetchAndSetUserInfo();

      // Reset the form fields
      setUsername("");
      setPassword("");
      navigate("/");
    } catch (error) {
      setAPIError("Invalid username or password");
      console.log(apiError);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <p>You are already logged in {userInfo.username}</p>
      ) : (
        <div className="container">
          <h2>Login</h2>
          <p>{apiError}</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
