import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Admin.module.css";

export default function Admin() {
  return (
    <div className={style.content}>
      <NavLink to="/admin"> usuario ADMIN</NavLink>{" "}
    </div>
  );
}
