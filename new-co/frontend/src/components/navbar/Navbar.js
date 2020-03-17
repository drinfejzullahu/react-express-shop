import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/user";
import Navlink from "./Navlink";
export default function Navbar() {
  const user = useSelector(state => state.usersReducer.logedUser);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(actions.loginFalse());
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Navlink name="Home" link="/" />

        {user !== null && user.roleId === 1 ? (
          <Navlink name="Admin" link="/admin" />
        ) : null}

        {user !== null ? (
          <Navlink
            onClick={handleLogout}
            style="right"
            name="Log Out"
            link="/"
          />
        ) : null}
      </nav>
    </div>
  );
}
