import React, { useContext, useEffect, useState } from "react";
import { FeaturedProduct } from "./FeaturedProduct";
import { GlobalContext } from "../../context/GlobalState";
import { HIGHLIGHTS_INTERVAL } from "../../utils/app-const";

export const FeaturedProductBanner = () => {
  const { featuredProducts, getFeaturedProducts } = useContext(GlobalContext);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    getFeaturedProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let timer = setTimeout(() => {
      index === featuredProducts.length - 1 ? setIndex(0) : setIndex(index + 1);
    }, HIGHLIGHTS_INTERVAL);

    return () => {
      clearTimeout(timer);
    }
  }, [index])

  return (
    <div id="featured-banner">
      <h4>Highlights</h4>
      {featuredProducts.map((product, i) => {
        if (i === index) {
          return (
            <FeaturedProduct
              key={product.id}
              {...product}
            />
          );
        }
      })}
    </div>
  );
};
