import actionTypes from "../actions/actionTypes";

export const loginReducer = ( state= { user:{} }, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return { loading: true, user:{} };
        case actionTypes.LOGIN_SUCCESS:
            return {
                loading: false,
                user: action.payload,
            };
        case actionTypes.LOGIN_FAIL:
            return { loading: false, error: action.payload };   
        case actionTypes.USER_LOGOUT:
            return {
                user:{}
            } 
        default:
            return state;
    }
};

export const registerReducer = ( state= { userNew:{} }, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_USER_REQUEST:
            return { loading: true, userNew:{} };
        case actionTypes.REGISTER_USER_SUCCESS:
            return {
                loading: false,
                userNew: action.payload,
            };
        case actionTypes.REGISTER_USER_FAIL:
            return { loading: false, error: action.payload };   
        case actionTypes.USER_LOGOUT:
            return {
                userNew:{}
            } 
        default:
            return state;
    }
};