import { useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();

  return (
    <h2 className="app-title">
      {location.pathname === "/admin" && "Smart Hardware Shop - Admin"}
      {location.pathname === "/" && "Smart Hardware Shop"}
    </h2>
  );
};
