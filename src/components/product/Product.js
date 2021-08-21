import { ADD } from "../../utils/app-const";
import { GlobalContext } from "../../context/GlobalState";
import { useContext } from "react";

export const Product = (props) => {
  const { updateCart } = useContext(GlobalContext);
  const { id, name, description, defaultImage, price, discount } = props;

  return (
    <div className="product-card">
      <img src={defaultImage} alt={name} />
      <div className="content">
        <h4>{name}</h4>
        <div>
          <span className="price">${price}</span> |{" "}
          <span className="discount">-${discount}</span>
        </div>
        <p>{description}</p>
        <button className="btn-primary" onClick={(event) => updateCart(id, ADD)}>Add to Cart</button>
      </div>
    </div>
  );
};
