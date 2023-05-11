import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools} from "redux-devtools-extension";
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productReviewsReducer, productsReducer, reviewReducer } from "./redux/reducers/productRedusers";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./redux/reducers/userReduser";
import { cartReducer } from './redux/reducers/cartReducer'
import {allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer} from './redux/reducers/orderReducer'
const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  allOrders: allOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
  allUsers: allUsersReducer,
  product: productReducer,
  newProduct: newProductReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  userDetails: userDetailsReducer
})

let initialState = {
    cart: {
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
    },
  };

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
   composeWithDevTools( applyMiddleware(...middleware))
);
export default store;
