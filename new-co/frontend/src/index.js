import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { reducer as usersReducer } from "./store/user";
import { reducer as productsReducer } from "./store/product";
import { reducer as customersReducer } from "./store/customer";
import { reducer as shopsReducer } from "./store/shop";
import { reducer as servicesReducer } from "./store/service";
import { reducer as productServiceReducer } from "./store/product-service";
import { reducer as soldReducer } from "./store/sold";

import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  usersReducer: usersReducer,
  productsReducer: productsReducer,
  customersReducer: customersReducer,
  shopsReducer: shopsReducer,
  servicesReducer: servicesReducer,
  productServiceReducer: productServiceReducer,
  soldReducer: soldReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
