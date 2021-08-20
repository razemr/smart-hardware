import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

const initialState = {
    products: [],
    cart: {
        products: [],
        id: null
    },
    error: ''
}

const USER_ID = 1;

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    async function getProducts(params) {
        try {
            let res = await axios.get('http://localhost:8080/products', { params: params });

            dispatch({
                type: 'GET_PRODUCTS',
                payload: res.data
            });

        } catch (error) {
            dispatch({
                type: 'ERROR',
                payload: error
            })
        }
    }

    async function getCart() {
        try {

            let res = await Promise.all([
                axios.get(`http://localhost:8080/carts/${USER_ID}`),
                axios.get('http://localhost:8080/products')
            ]);

            dispatch({
                type: 'GET_CART',
                payload: { userCart: res[0].data, allProducts: res[1].data }
            })

        } catch (error) {
            dispatch({
                type: 'ERROR',
                payload: error
            })
        }
    }

    async function updateCart(id, action) {
        try {
            let res = await axios.get(`http://localhost:8080/carts/${USER_ID}`);
            let userCart = res.data;

            if(action === 'ADD') {
                let updated = false;
                for(let i = 0; i < userCart.products.length; i++) {
                    if(userCart.products[i].id == id) {
                        userCart.products[i].quantity++;
                        updated = true;
                        break;
                    }
                }
    
                if(!updated) {
                    userCart.products.push({
                        id,
                        quantity: 1
                    });
                }
            } else if(action === 'DELETE') {
                userCart.products = userCart.products.filter(p => p.id != id);
            }

            res = await Promise.all([
                axios.put(`http://localhost:8080/carts/${USER_ID}`, userCart),
                axios.get('http://localhost:8080/products')
            ]);

            dispatch({
                type: 'UPDATE_CART',
                payload: { userCart: res[0].data, allProducts: res[1].data }
            });

        } catch (error) {
            dispatch({
                type: 'ERROR',
                payload: error
            })
        }
    }

    async function removeProductFromCart(id) {

    }

    return (<GlobalContext.Provider value={{
        products: state.products,
        cart: state.cart,
        error: state.error,
        getProducts,
        getCart,
        updateCart
    }}>{children}</GlobalContext.Provider>)
}