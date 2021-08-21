import { FeaturedProduct } from "./FeaturedProduct";
import { GlobalContext } from "../../context/GlobalState";
import { useContext, useEffect } from "react";

export const FeaturedProductBanner = () => {
  const { featuredProduct, getFeaturedProduct } = useContext(GlobalContext);

  useEffect(() => {
    getFeaturedProduct();

    let timer = setInterval(() => {
      getFeaturedProduct();
    }, 10000);

    return () => {
      clearInterval(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="featured-banner">
      <h4>Highlights</h4>
      <FeaturedProduct {...featuredProduct} />
    </div>
  );
};
