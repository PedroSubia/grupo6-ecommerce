import { combineReducers } from "redux";
import { productDetailsReducer, productListReducer } from "./productReducers";
import { loginReducer, registerReducer } from "./userReducers";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails : productDetailsReducer,
    userReducer: loginReducer || registerReducer,

});

export default reducer;