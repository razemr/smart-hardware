import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

export const Loader = () => {
  const { loading } = useContext(GlobalContext);

  return (
    <div id="loader" className={loading ? "animate" : ""} style={loading ? { visibility: "visible" } : { visibility: "hidden" }}></div> 
  )
};