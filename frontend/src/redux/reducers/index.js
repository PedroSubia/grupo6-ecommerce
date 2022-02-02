import { combineReducers } from "redux";
import { productDetailsReducer, productListReducer } from "./productReducers";


const reducer = combineReducers({
    productList: productListReducer,
    productDetails : productDetailsReducer
});

export default reducer;