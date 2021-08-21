import { useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();

  return (
    <div className="app-title">
      {location.pathname === "/admin" && <h2>Smart Hardware Shop - Admin</h2>}
      {location.pathname === "/" && <h2>Smart Hardware Shop</h2>}
    </div>
  );
};
