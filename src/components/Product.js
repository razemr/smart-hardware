import { ADD } from '../utils/app-const';

export const Product = (props) => {
    const {id, name, description, defaultImage, price, discount, onClick} = props;
    return (
        <div className="product-card">
            <img src={defaultImage} alt={name}/>
            <div className="content">
                <h4>{name}</h4>
                <div><span className="price">${price}</span> | <span className="discount">-${discount}</span></div>
                <p>{description}</p>
                <button onClick={event => onClick(id, ADD)}>Add to cart</button>
            </div>
        </div>
    );
}