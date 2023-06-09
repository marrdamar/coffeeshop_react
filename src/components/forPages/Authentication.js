import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export class Authentication extends Component {
  render() {
    return (
      <Fragment>
        <Link to="/login" className="btn font-medium">
          Login
        </Link>
        <Link
          to="/signup"
          className="btn font-medium w-28 h-8 md:w-36 md:h-11 flex items-center justify-center rounded-3xl bg-primary text-secondary drop-shadow-lg"
        >
          Sign Up
        </Link>
      </Fragment>
    );
  }
}

export default Authentication;
