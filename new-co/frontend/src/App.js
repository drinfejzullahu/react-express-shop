import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Login from "./components/auth/Login";
import MainPage from "./components/mainpage/MainPage";
import NewService from "./components/service/NewService";
import NewProduct from "./components/product/NewProduct";
import NewShop from "./components/shop/Newshop";
import NewUser from "./components/auth/AddUser";
import NewCustomer from "./components/auth/AddCustomer";
import Navbar from "./components/navbar/Navbar";
import AdminMainPage from "./components/admin/AdminMainPage";
import * as actions from "./store/user";

function App() {
  const logedIn = useSelector(state => state.usersReducer.logedIn);
  const logedUser = useSelector(state => state.usersReducer.logedUser);

  const dispatch = useDispatch();
  const users = useSelector(state => state.usersReducer.users);

  useEffect(() => {
    dispatch(actions.getUsersAsync());
  }, []);

  return (
    <Router>
      {logedIn === true ? <Navbar /> : null}
      <Route exact path="/login">
        {users.length === 0 ? (
          <NewUser />
        ) : logedIn === false ? (
          <Login to="/" />
        ) : (
          <Redirect to="/" />
        )}
      </Route>
      <Switch>
        <Route exact path="/">
          {logedIn === true ? <MainPage /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/new-user">
          {logedIn === true ? <NewUser /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/new-customer">
          {logedIn === true ? <NewCustomer /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/new-product">
          {logedIn === true ? <NewProduct /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/new-shop">
          {logedIn === true ? <NewShop /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/new-service">
          {logedIn === true ? <NewService /> : <Redirect to="/login" />}
        </Route>
        {/* <Route exact path="/sell">
          {logedIn === true ? <Sell /> : <Redirect to="/login" />}
        </Route> */}
        <Route exact path="/admin">
          {logedIn === true && logedUser.roleId === 1 ? (
            <AdminMainPage />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
