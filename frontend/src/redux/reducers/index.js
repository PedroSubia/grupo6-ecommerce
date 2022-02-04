import { combineReducers } from "redux";
import { productDetailsReducer, productListReducer, productDeleteReducer, productCreateReducer } from "./productReducers";
import { loginReducer, registerReducer } from "./userReducers";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    userReducer: loginReducer || registerReducer,
    productDelete: productDeleteReducer,
    newProduct: productCreateReducer,

});

export default reducer;