import { combineReducers } from "redux";
import { productDetailsReducer, productListReducer } from "./productReducers";
import { loginReducer, registerReducer } from "./userReducers";
import { myCart } from "./cartReducer";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails : productDetailsReducer,
    userReducer: loginReducer || registerReducer,
    cartReducer : myCart,

});

export default reducer;