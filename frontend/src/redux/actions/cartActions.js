import actionTypes from "./actionTypes";
import { getMyCart } from "../../services/orderServices";

export const addProductCart = (item) => {
    return (dispatch) => {
            //console.log('product recibido en addProductCart en Action: ', product);
            const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
            //console.log('carrito en cartAction', cart);
            cart.push(item);
            //console.log('carrito en cartAction despues de pushear', cart)
            dispatch({
                type: actionTypes.CART_ADD_ITEM,
                payload: cart,
            });
            localStorage.setItem('cart', JSON.stringify(cart));
    };
};
export const deleteProductCart = (item) => {
    return (dispatch) => {
            let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
            //console.log('carrito en cartAction antes de eliminar item', cart);
            cart = cart.filter( (elemento) => elemento.product._id !== item.product._id);
            //console.log('carrito en cartAction despues de eliminar item', cart);
            dispatch({
                type: actionTypes.CART_REMOVE_ITEM,
                payload: cart,
            });
            localStorage.setItem('cart', JSON.stringify(cart));
    };
};

export const myOrders = (tokenUser) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.ORDER_LIST_MY_REQUEST });
            const data = await getMyCart(tokenUser);
            dispatch({
                type: actionTypes.ORDER_LIST_MY_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: actionTypes.ORDER_LIST_MY_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message : error.message,
            });
        }
    };
};

