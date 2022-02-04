import actionTypes from './actionTypes';
import { getProducts, getProductById, deleteProduct1, registerProduct } from '../../services/productServices';
import { logoutUser } from './userActions';

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

export const deleteProduct = (id, token) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.PRODUCT_DELETE_REQUEST,
      });

      await deleteProduct1(id, token);
      dispatch({
        type: actionTypes.PRODUCT_DELETE_SUCCESS,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Not authorized, token failed') {
        dispatch(logoutUser());
      }
      dispatch({
        type: actionTypes.PRODUCT_DELETE_FAIL,
        payload: message,
      });
    }
  };
};

export const listProductsDetails = (id) => {
  return async (dispatch) => {
    try {
      console.log("Product details: ");
      dispatch({ type: actionTypes.PRODUCT_DETAILS_REQUEST });
      const data = await getProductById(id);
      console.log("data: ", data);
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

export const createProduct = (body, token) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.PRODUCT_CREATE_REQUEST,
      });
      const data = await registerProduct(body, token);
      dispatch({
        type: actionTypes.PRODUCT_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PRODUCT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};