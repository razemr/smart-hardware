import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';
import { USER_ID, GET_USER, GET_PRODUCTS, UPDATE_CART, ADD, DELETE, ERROR, ADD_PRODUCT, GET_CART , DELETE_PRODUCT, EDIT_PRODUCT} from '../utils/app-const';

const initialState = {
    products: [],
    cart: {
        products: [],
        id: null
    },
    user: {
        name: {
            firstName: '',
            lastName: ''
        }
    },
    error: ''
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    async function getUser() {
        try {
            let res = await axios.get(`http://localhost:8080/users/${USER_ID}`);
            dispatch({
                type: GET_USER,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: error
            })
        }
    }

    async function getProducts(params) {
        try {
            let res = await axios.get('http://localhost:8080/products', { params: params });

            dispatch({
                type: GET_PRODUCTS,
                payload: res.data
            });

        } catch (error) {
            dispatch({
                type: ERROR,
                payload: error
            })
        }
    }

    async function editProduct(product, id) {
        try {
            let res = await axios.put(`http://localhost:8080/products/${id}`, product);

            dispatch({
                type: EDIT_PRODUCT,
                payload: res.data
            });

        } catch (error) {
            dispatch({
                type: ERROR,
                payload: error
            })
        }
    }

    async function addProduct(product) {
        try {
            let res = await axios.post('http://localhost:8080/products', product);

            dispatch({
                type: ADD_PRODUCT,
                payload: res.data
            });

        } catch (error) {
            dispatch({
                type: ERROR,
                payload: error
            })
        }
    }

    async function deleteProduct(id) {
        try {
            await axios.delete(`http://localhost:8080/products/${id}`);

            dispatch({
                type: DELETE_PRODUCT,
                payload: id
            });
        } catch (error) {
            dispatch({
                type: ERROR,
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
                type: GET_CART,
                payload: { userCart: res[0].data, allProducts: res[1].data }
            })

        } catch (error) {
            dispatch({
                type: ERROR,
                payload: error
            })
        }
    }

    async function updateCart(id, action) {
        try {
            let res = await axios.get(`http://localhost:8080/carts/${USER_ID}`);
            let userCart = res.data;

            if(action === ADD) {
                let updated = false;
                for(let i = 0; i < userCart.products.length; i++) {
                    if(userCart.products[i].id === id) {
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
            } else if(action === DELETE) {
                userCart.products = userCart.products.filter(p => p.id !== id);
            }

            res = await Promise.all([
                axios.put(`http://localhost:8080/carts/${USER_ID}`, userCart),
                axios.get('http://localhost:8080/products')
            ]);

            dispatch({
                type: UPDATE_CART,
                payload: { userCart: res[0].data, allProducts: res[1].data }
            });

        } catch (error) {
            dispatch({
                type: ERROR,
                payload: error
            })
        }
    }

    return (<GlobalContext.Provider value={{
        products: state.products,
        cart: state.cart,
        error: state.error,
        user: state.user,
        getProducts,
        addProduct,
        deleteProduct,
        editProduct,
        getCart,
        updateCart,
        getUser
    }}>{children}</GlobalContext.Provider>)
}