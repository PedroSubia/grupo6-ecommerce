import { combineReducers } from "redux";
import { productDetailsReducer, productListReducer,productDeleteReducer } from "./productReducers";
import { loginReducer, registerReducer } from "./userReducers";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails : productDetailsReducer,
    userReducer: loginReducer || registerReducer,
    productDelete : productDeleteReducer,

});

export default reducer;