import { ADD } from "../../utils/app-const";
import { GlobalContext } from "../../context/GlobalState";
import { useContext } from "react";

export const Product = (props) => {
  const { updateCart } = useContext(GlobalContext);
  const { id, name, description, defaultImage, price, discount } = props;

  return (
    <div className="product-card">
      <img src={defaultImage} alt={name} />
      <div className="card-content">
        <h4>{name}</h4>
        <div className="price">
          <span className="color-primary">${price}</span> |{" "}
          <span className="color-secondary">-${discount}</span>
        </div>
        <p>{description}</p>

        <div className="actions">
          <button className="btn-primary" onClick={(event) => updateCart(id, ADD)}>Add to Cart</button>
        </div>
        
      </div>
    </div>
  );
};
