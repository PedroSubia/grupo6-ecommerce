import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers';

const userLogged = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
//console.log('userLogged obtenido en store', userLogged);
//console.log(localStorage.getItem('user'));
const cartInitial = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
//console.log('cartInitial en store: ', cartInitial);
const initialState = {
    userReducer: {
        user: userLogged
    },
    cartReducer: {
        cart: cartInitial
    }
};
//const initialState = {};
const middleware = [thunk];

const store = createStore(
    // TODO: reducer 
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;