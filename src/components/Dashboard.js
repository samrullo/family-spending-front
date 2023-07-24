import React from "react";
import { useContext } from "react";
import AppContext from "../AppContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { isLoggedIn, handleLogout, userInfo, fetchAndSetUserInfo } =
    useContext(AppContext);

  return (
    <>
      <p>This is Dashboard for you dear user {userInfo.username}</p>
      {isLoggedIn ? (
        <>
          <ul>
            <li>Username : {userInfo.username}</li>
            <li>User id : {userInfo.pk}</li>
            <li>User email : {userInfo.email}</li>
          </ul>

          <ul>
            <li>
              <Link className="btn btn-dark" to="/businesses">
                Business
              </Link>
            </li>
          </ul>
        </>
      ) : (
        <p>Please login first</p>
      )}
    </>
  );
};

export default Dashboard;
