import AppContext from "../AppContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
const Profile = () => {
  const { isLoggedIn, handleLogout, userInfo, fetchAndSetUserInfo } =
    useContext(AppContext);

  return (
    <>
      <h1>Profile</h1>
      {isLoggedIn ? (
        <ul className="list-group">
          <li className="list-group-item">User Id : {userInfo.id}</li>
          <li className="list-group-item">Username : {userInfo.username}</li>
          <li className="list-group-item">User email : {userInfo.email}</li>
        </ul>
      ) : (
        <div>
          Login first <Link to="/login">Login</Link>
        </div>
      )}
    </>
  );
};
export default Profile;
