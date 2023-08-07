import { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../AppContext";
import { useEffect } from "react";
import AppRoutes from "./AppRoutes";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";
import { Spinner } from "react-bootstrap";

const MainPage = () => {
  const {
    isLoggedIn,
    handleLogout,
    userInfo,
    fetchAndSetUserInfo,
    flashMessages,
    isSpinning,
  } = useContext(AppContext);

  useEffect(() => {
    if (isLoggedIn && !userInfo.username) {
      fetchAndSetUserInfo();
    }
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchAndSetUserInfo();
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="container mt-5">
        <header>
          <NavBar
            isLoggedIn={isLoggedIn}
            title="Business Accounting"
            authenticatedLinks={[{ link: "/profile", name: userInfo.username }]}
            nonAuthenticatedLinks={[
              { link: "/login", name: "Login" },
              { link: "/register", name: "Register" },
            ]}
          />
        </header>
        {isSpinning && 
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      }
        {flashMessages.length === 0 ? (
          <></>
        ) : (
          flashMessages.map(({ category, message }) => (
            <div className={`alert alert-${category}`}>
              <p>{message}</p>
            </div>
          ))
        )}

        <AppRoutes />
      </div>
    </BrowserRouter>
  );
};

export default MainPage;
