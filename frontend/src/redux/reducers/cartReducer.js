import actionTypes from "../actions/actionTypes";

export const myCart = ( state = { cart:[] }, action ) => {
    switch (action.type) {

        case actionTypes.CART_ADD_ITEM:
            return { 
                cart: action.payload,
            };

        case actionTypes.CART_REMOVE_ITEM:
            return { cart: action.payload, 
            };
        default:
            return state;
    }
};