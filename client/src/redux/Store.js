import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import cartReducer from "./reducer/cartReducer.js";
import registerUserReducer from "./reducer/userReducer.js";
import loginUserReducer from "./reducer/userReducer.js";
import placeOrderReducer from "./reducer/orderReducer.js";
import getUserOrdersReducer from "./reducer/orderReducer.js";
import getAllProduct from "./reducer/productReducer.js";

const finalReducer = combineReducers({
  getAllProduct: getAllProduct,
  cartReducer: cartReducer,
  registerUserReducer: registerUserReducer,
  loginUserReducer: loginUserReducer,
  placeOrderReducer: placeOrderReducer,
  getUserOrdersReducer: getUserOrdersReducer,
});

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

const initialState = {
  cartReducer: {
    cartItems: cartItems,
  },
  loginUserReducer: {
    currentUser: currentUser,
  },
};
const composeEnhancers = composeWithDevTools({});
const Store = createStore(
  finalReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default Store;
