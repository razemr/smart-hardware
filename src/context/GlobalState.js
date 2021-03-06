import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
import {
  USER_ID,
  GET_USER,
  GET_PRODUCTS,
  UPDATE_CART,
  ADD,
  DELETE,
  ERROR,
  ADD_PRODUCT,
  GET_CART,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  LOADING,
  GET_FEATURED_PRODUCTS,
} from "../utils/app-const";

const initialState = {
  products: [],
  cart: {
    products: [],
    id: null,
  },
  user: {
    name: {
      firstName: "",
      lastName: "",
    },
  },
  featuredProducts: [],
  loading: false,
  error: "",
};

const ax = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 1000,
});

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const setLoading = () => {
    dispatch({
      type: LOADING,
    });
  };

  async function getUser() {
    try {
      setLoading();
      let res = await ax.get(`users/${USER_ID}`);

      dispatch({
        type: GET_USER,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  }

  async function getProducts(params) {
    try {
      setLoading();
      let res = await ax.get("products", {
        params: params,
      });

      dispatch({
        type: GET_PRODUCTS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  }

  async function getFeaturedProducts() {
    try {
      let res = await ax.get("recommendeds");
      dispatch({
        type: GET_FEATURED_PRODUCTS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  }

  async function editProduct(product, id) {
    try {
      setLoading();
      let res = await ax.put(`products/${id}`, product);

      dispatch({
        type: EDIT_PRODUCT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  }

  async function addProduct(product) {
    try {
      setLoading();
      let res = await ax.post("products", product);

      dispatch({
        type: ADD_PRODUCT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  }

  async function deleteProduct(id) {
    try {
      setLoading();
      await ax.delete(`products/${id}`);

      dispatch({
        type: DELETE_PRODUCT,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  }

  async function getCart() {
    try {
      setLoading();
      let res = await Promise.all([
        ax.get(`carts/${USER_ID}`),
        ax.get("products"),
      ]);

      dispatch({
        type: GET_CART,
        payload: { userCart: res[0].data, allProducts: res[1].data },
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  }

  async function updateCart(id, action) {
    try {
      setLoading();
      let res = await ax.get(`carts/${USER_ID}`);
      let userCart = res.data;

      if (action === ADD) {
        let updated = false;
        for (let i = 0; i < userCart.products.length; i++) {
          if (userCart.products[i].id === id) {
            userCart.products[i].quantity++;
            updated = true;
            break;
          }
        }

        if (!updated) {
          userCart.products.push({
            id,
            quantity: 1,
          });
        }
      } else if (action === DELETE) {
        userCart.products = userCart.products.filter((p) => p.id !== id);
      }

      res = await Promise.all([
        ax.put(`carts/${USER_ID}`, userCart),
        ax.get("products"),
      ]);

      dispatch({
        type: UPDATE_CART,
        payload: { userCart: res[0].data, allProducts: res[1].data },
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        products: state.products,
        cart: state.cart,
        error: state.error,
        user: state.user,
        featuredProducts: state.featuredProducts,
        loading: state.loading,
        getProducts,
        getFeaturedProducts,
        addProduct,
        deleteProduct,
        editProduct,
        getCart,
        updateCart,
        getUser
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
