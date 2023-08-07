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
          <ul className="list-group">
            <li className="list-group-item">
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
