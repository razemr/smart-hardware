const variable = (state, action) => {
    
    switch(action.type) {
        case 'GET_PRODUCTS':
            return {
                ...state,
                products: action.payload
            };
        case 'GET_CART':
            return {
                ...state,
                cart: {
                    id: action.payload.userCart.id,
                    products: action.payload.userCart.products.map(product => ({
                            ...product, ...action.payload.allProducts.find(prod => prod.id === product.id) 
                        })
                    )
                }
            };
        case 'UPDATE_CART':
            return {
                ...state,
                cart: {
                    id: action.payload.userCart.id,
                    products: action.payload.userCart.products.map(product => ({
                            ...product, ...action.payload.allProducts.find(prod => prod.id === product.id) 
                        })
                    )
                }
            };
        case 'ERROR':
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}

export default variable;
