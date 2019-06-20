import React from "react";
import { Link } from "react-router-dom";

import "./menu.css";

export default () => {
  return (
    <menu className="main-menu">
      <h1 className="title">Dad Jokes</h1>
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </menu>
  );
};
