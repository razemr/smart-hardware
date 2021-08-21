import { ADD } from "../../utils/app-const";
import { GlobalContext } from "../../context/GlobalState";
import { useContext } from "react";

export const FeaturedProduct = (props) => {
  const { updateCart } = useContext(GlobalContext);
  const { id, name, description, defaultImage, price, discount } = props;

  return (
    <div className="feature">
      <img src={defaultImage} alt="Feature" />
      <div className="feature-detail">
        <h4>{name}</h4>
        <p>{description}</p>
        <div className="price-detail">
          <span className="price">${price}</span> |{" "}
          <span className="discount">-${discount}</span>
        </div>
        <button className="btn-primary" onClick={(event) => updateCart(id, ADD)}>Add to Cart</button>
      </div>
    </div>
  );
};
