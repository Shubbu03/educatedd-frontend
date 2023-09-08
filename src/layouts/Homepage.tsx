import React from "react";
import { VSeparator, HSeparator } from "components/separator/Separator";
import { Link, NavLink, Route } from "react-router-dom";
import "./Homepage.css";
import SignIn from "views/auth/signIn";
import SignUp from "views/auth/signUp";

function Homepage() {
  return (
    <header className="Header-main">
      <div className="Div-main">
        <span className="fs-4">Educatedd</span>
      </div>
      <ul className="button-list">
        <li className="button-list-item">
          <NavLink to={"/login"}>
            <button className="button-primary">Login</button>
          </NavLink>
          <NavLink to={"/register"}>
            <button className="button-secondary">Register</button>
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Homepage;
