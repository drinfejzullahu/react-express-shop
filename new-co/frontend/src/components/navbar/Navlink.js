import React from "react";
import { NavLink } from "react-router-dom";

export default function Navlink(props) {
  return (
    <div className="nav-item nav-link">
      <NavLink
        onClick={props.onClick}
        style={{
          textDecoration: "none",
          color: "white"
        }}
        to={props.link}
      >
        {props.name}
      </NavLink>
    </div>
  );
}
