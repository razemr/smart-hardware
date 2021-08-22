import { FeaturedProduct } from "./FeaturedProduct";
import { GlobalContext } from "../../context/GlobalState";
import { useContext, useEffect, useState } from "react";

let index = 0;

export const FeaturedProductBanner = () => {
  const { featuredProducts, getFeaturedProducts } = useContext(GlobalContext);
  const [featuredProduct, setFeaturedProduct] = useState({});

  useEffect(() => {
    getFeaturedProducts();

    setFeaturedProduct(featuredProducts[index]);

    let timer = setInterval(() => {
      setFeaturedProduct(featuredProducts[index]);
      if(++index === featuredProducts.length) index = 0;
    }, 5000);

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
