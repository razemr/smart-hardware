import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Link, useLocation } from "react-router-dom";

export const NavBar = () => {
  const { user, getUser } = useContext(GlobalContext);
  const location = useLocation();

  useEffect(() => {
    getUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="nav-bar">
      {location.pathname === "/admin" && (
        <Link to="/">
          <button className="btn-default">Home</button>
        </Link>
      )}
      {location.pathname === "/" && (
        <Link to="/admin">
          <button className="btn-default">Admin Panel</button>
        </Link>
      )}
      <img
        src={user.defaultImage || "http://placeimg.com/128/128/cats"}
        alt="User avatar"
      />
    </div>
  );
};
