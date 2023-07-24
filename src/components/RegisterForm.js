import React, { useState } from "react";
import { API_BASE_URL, REGISTRATION_ENDPOINT } from "./apiConfig";
import axios from "axios";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}${REGISTRATION_ENDPOINT}`,
        {
          username: username,
          email: email,
          password1: password,
          password2: password2,
        }
      );
      console.log(
        `Sent POST request to registration endpoint and received response : ${response.data}`
      );
    } catch (error) {
      console.log(error);
    }
    // Perform registration logic here
    console.log("Username:", username);
    console.log("Password:", password);
    // Clear form fields
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Enter Password once again:</label>
          <input
            type="password"
            id="password2"
            className="form-control"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
