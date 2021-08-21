import {
  GET_USER,
  GET_PRODUCTS,
  UPDATE_CART,
  ERROR,
  ADD_PRODUCT,
  GET_CART,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  GET_FEATURED_PRODUCT,
} from "../utils/app-const";

const variable = (state, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case GET_FEATURED_PRODUCT:
      return {
        ...state,
        featuredProduct: action.payload[state.featuredProductIndex],
        featuredProductIndex:
          ++state.featuredProductIndex > 8 ? 0 : state.featuredProductIndex,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products],
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        products: state.products.map((p) => {
          if (p.id === action.payload.id) {
            return { ...p, ...action.payload };
          }

          return p;
        }),
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };
    case GET_CART:
      return {
        ...state,
        cart: {
          id: action.payload.userCart.id,
          products: action.payload.userCart.products.map((product) => ({
            ...product,
            ...action.payload.allProducts.find(
              (prod) => prod.id === product.id
            ),
          })),
        },
      };
    case UPDATE_CART:
      return {
        ...state,
        cart: {
          id: action.payload.userCart.id,
          products: action.payload.userCart.products.map((product) => ({
            ...product,
            ...action.payload.allProducts.find(
              (prod) => prod.id === product.id
            ),
          })),
        },
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default variable;
