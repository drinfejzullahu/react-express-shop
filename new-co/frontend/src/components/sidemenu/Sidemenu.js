import React from "react";
import { useSelector } from "react-redux";
import Sidelink from "./SideLink";

export default function Sidemenu() {
  const logedUser = useSelector(state => state.usersReducer.logedUser);

  return (
    <div>
      <div className="list-group p-2 card">
        {logedUser.roleId === 1 ? (
          <Sidelink name="New User" link="/new-user" />
        ) : null}
        <Sidelink name="New Product" link="/new-product" />
        <Sidelink name="New Service" link="/new-service" />
        <Sidelink name="New Customer" link="/new-customer" />
        {logedUser.roleId === 1 ? (
          <Sidelink name="New Shop" link="/new-shop" />
        ) : null}
      </div>
    </div>
  );
}
