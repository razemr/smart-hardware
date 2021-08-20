import React from 'react'

export const CartItem = (props) => {
    const {id, name, quantity, price, onClick} = props;

    return (
        <div className="cart-item">
            <button onClick={event => onClick(id, 'DELETE')}>X</button>
            <div className="title">{name}<span> (x{quantity})</span></div>
            <div className="price">${(price * quantity).toFixed(2)}</div>
        </div>
    );
}