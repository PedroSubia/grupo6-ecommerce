import actionTypes from './actionTypes';
import { getProducts, getProductById } from '../../services/productServices';

export const listProducts = (keyword = '', pageNumber = '') => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.PRODUCT_LIST_REQUEST });
            const data = await getProducts(keyword, pageNumber);
            dispatch({
                type: actionTypes.PRODUCT_LIST_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: actionTypes.PRODUCT_LIST_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message : error.message,
            });
        }
    };
};

export const listProductsDetails = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.PRODUCT_DETAILS_REQUEST });
            const data = await getProductById(id);
            //console.log("Product details: ");
            //console.log("data: ", data);
            dispatch({
                type: actionTypes.PRODUCT_DETAILS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: actionTypes.PRODUCT_DETAILS_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
};