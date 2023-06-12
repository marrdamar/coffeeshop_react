import React, { useState } from "react";
import { Link } from "react-router-dom";

import Authentication from "../forPages/Authentication";
import Account from "../forPages/Account";

import logoBrand from "../../assets/icon/logo.svg";
import toggleNav from "../../assets/icon/toggle-menu.svg";
import toggleClose from "../../assets/icon/close.svg";
import { useSelector } from "react-redux";

export function Header(props) {
  // const state = useSelector((state) => state);
  const stateStore = useSelector((state) => state.user);
  // const [isLogin] = useState(state.user.isLogin);
  const [toggleActive, setToggleActive] = useState(false);

  const handleToggle = () => {
    setToggleActive(!toggleActive);
  };
  console.log(stateStore)
  return (
    <header className="w-full fixed h-14 md:h-28 flex items-center justify-center shadow-lg bg-white z-50">
      <nav className="flex w-full md:w-4/5 mx-4 md:mx-0 max-width">
        <div className="navbrand flex items-center mr-auto gap-4">
          <img src={logoBrand} alt="logo-brand" className="w-8" />
          <h1 className="text-2xl font-bold">Coffee Shop</h1>
        </div>
        <div
          className={toggleActive ? "navbar right-0" : "navbar right-[-150%]"}
        >
          <Link
            to="/"
            className={
              props.title === "home" ? "navlink nav-active" : "navlink"
            }
          >
            Home
          </Link>
          <Link
            to="/products"
            className={
              props.title === "products" ? "navlink nav-active" : "navlink"
            }
          >
            Product
          </Link>
          <Link
            to="/yourcart"
            className={
              props.title === "yourcart" ? "navlink nav-active" : "navlink"
            }
          >
            Your Cart
          </Link>
          <Link
            to="/history"
            className={
              props.title === "history" ? "navlink nav-active" : "navlink"
            }
          >
            History
          </Link>
        </div>
        <div
          className={toggleActive ? "account right-0" : "account right-[-150%]"}
        >
          {stateStore.token ? (
            <Account searchValue={props.searchValue} />
          ) : (
            <Authentication />
          )}
        </div>
        <div onClick={handleToggle} className="toggle cursor-pointer flex">
          <img
            src={toggleActive ? toggleClose : toggleNav}
            alt=""
            className="w-10 md:hidden"
          />
        </div>
      </nav>
    </header>
  );
}

export default Header;
