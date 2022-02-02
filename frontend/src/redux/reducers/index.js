import { combineReducers } from "redux";
import { loginReducer, registerReducer } from "./userReducers";
import { productListReducer } from "./productReducers";

const reducer = combineReducers({
    productList: productListReducer,
    userReducer: loginReducer || registerReducer,
});

export default reducer;