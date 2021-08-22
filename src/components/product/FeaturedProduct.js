import { ADD } from "../../utils/app-const";
import { GlobalContext } from "../../context/GlobalState";
import { useContext, useEffect } from "react";

export const FeaturedProduct = () => {
  const { updateCart, featuredProduct, getFeaturedProduct } = useContext(GlobalContext);

  useEffect(() => {
    getFeaturedProduct();

    let timer = setInterval(() => {
      getFeaturedProduct();
    }, 5000);

    return () => {
      clearInterval(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="featured-container">
      <img src={featuredProduct.defaultImage} alt="Feature" />
      <div id="feature-detail">
        <h4>{featuredProduct.name}</h4>
        <p>{featuredProduct.description}</p>
        <div>
          <span className="color-primary">${featuredProduct.price}</span> |{" "}
          <span className="color-secondary">-${featuredProduct.discount}</span>
        </div>
        <button className="btn-primary" onClick={(event) => updateCart(featuredProduct.id, ADD)}>Add to Cart</button>
      </div>
    </div>
  );
};
