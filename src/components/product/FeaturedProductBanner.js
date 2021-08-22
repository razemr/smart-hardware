import { FeaturedProduct } from "./FeaturedProduct";
import { GlobalContext } from "../../context/GlobalState";
import { useContext, useEffect, useState } from "react";

let index = 0;

export const FeaturedProductBanner = () => {
  return (
    <div id="featured-banner">
      <h4>Highlights</h4>
      <FeaturedProduct />
    </div>
  );
};
