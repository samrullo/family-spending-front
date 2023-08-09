import { useContext } from "react";
import AppContext from "../AppContext";
import { Link, useNavigate } from "react-router-dom";

const NavBar = ({ title, authenticatedLinks, nonAuthenticatedLinks }) => {
  const navigate = useNavigate();
  const { isLoggedIn, handleLogout } = useContext(AppContext);

  const processLogout = () => {
    handleLogout();
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-light navbar-light">
      <Link className="navbar-brand" to="/">
        {title}
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#mynavigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="mynavigation">
        <ul className="navbar-nav ml-auto">
          {isLoggedIn
            ? authenticatedLinks.map((authenticatedLink) => (
                <li className="nav-item" key={authenticatedLink.name}>
                  <Link className="nav-link" to={authenticatedLink.link}>
                    {authenticatedLink.name}
                  </Link>
                </li>
              ))
            : nonAuthenticatedLinks.map((nonAuthenticateLink) => (
                <li className="nav-item" key={nonAuthenticateLink.name}>
                  <Link className="nav-link" to={nonAuthenticateLink.link}>
                    {nonAuthenticateLink.name}
                  </Link>
                </li>
              ))}
          {isLoggedIn ? (
            <>
              <li className="nav-item" key="logout">
                <button className="nav-link" onClick={processLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
