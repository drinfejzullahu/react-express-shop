import React from "react";
import { NavLink } from "react-router-dom";

export default function SideLink(props) {
  return (
    <div>
      <div className="list-group-item list-group-item-action list-group-item-light mt-1 mb-1">
        <NavLink
          style={{ textDecoration: "none", color: "black" }}
          to={props.link}
        >
          {props.name}
        </NavLink>
      </div>
    </div>
  );
}
