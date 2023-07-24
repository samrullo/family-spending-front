import { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../AppContext";
import { useEffect } from "react";
import AppRoutes from "./AppRoutes";
import { BrowserRouter } from "react-router-dom";

const MainPage = () => {
  const { isLoggedIn, handleLogout, userInfo, fetchAndSetUserInfo } =
    useContext(AppContext);

  useEffect(() => {
    if (isLoggedIn && !userInfo.username) {
      fetchAndSetUserInfo();
    }
  });

  return (
    <BrowserRouter>
      <div className="container mt-5">
        <header className="d-flex justify-content-between align-items-center mb-4">
          <h1>Welcome to Business Accounting {userInfo.username}</h1>
          <nav>
            <ul className="list-inline">
              <li>
                <Link className="btn btn-dark" to="/">Top</Link>
              </li>
              {isLoggedIn ? (
                <li>
                  <button className="btn btn-dark" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              ) : (
                <>
                <li className="list-inline-item">
                  <Link className="btn btn-dark" to="/login">
                    Login
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link className="btn btn-dark" to="/register">
                    Register
                  </Link>
                </li>
                </>
              )}
            </ul>
          </nav>
        </header>
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
};

export default MainPage;
