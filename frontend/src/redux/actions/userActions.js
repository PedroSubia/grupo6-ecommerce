import actionTypes from './actionTypes';
import { loginServices } from '../../services/userServices';
import { postUser } from '../../services/userServices';

export const loginActions = ( dataLogin ) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.LOGIN_REQUEST });
            const data = await loginServices( dataLogin );
            //console.log('data recibida en loginActions: ', data);
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                payload: data,
            });
            localStorage.setItem('user', JSON.stringify(data));
        } catch (error) {
            dispatch({
                type: actionTypes.LOGIN_FAIL,
                payload: 
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
            });
        }
    };
};

export const registerUser = ( newUser ) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.REGISTER_USER_REQUEST });
            const data = await postUser ( newUser );

            dispatch({ 
                type: actionTypes.REGISTER_USER_SUCCESS,
                payload: data,
            });
            dispatch({ 
                type: actionTypes.LOGIN_SUCCESS,
                payload: data,
            });

        } catch (error) {
            dispatch({ 
                type: actionTypes.REGISTER_USER_FAIL,
                payload: 
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
            });
        }
    }
}

export const logoutUser = () => {
    return (dispatch) => {
        dispatch({ type: actionTypes.USER_LOGOUT});
        localStorage.removeItem('user');
    }
    //localStorage.clear();
};