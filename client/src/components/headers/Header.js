import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "./icon/menu.svg";
import Close from "./icon/close.svg";
import Cart from "./icon/cart.svg";
import { Link } from "react-router-dom";
import axios from "axios";

function Header() {
  const state = useContext(GlobalState); //console.log(state);// Film 12  07:00
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart; // Film 12   22:25 - 22:45

  // Logout   12:01 - 12:43
  const logoutUser = async () => {
    await axios.get("/user/logout");
    localStorage.clear();
    setIsAdmin(false);
    setIsLogged(false);
  };

  // Admin Router    (07:55 - 08:38)
  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/create_product">Create Product</Link>
        </li>
        <li>
          <Link to="/category">Categories</Link>
        </li>
      </>
    );
  };
  // Logged Router   (08:43 - 09:11)
  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/" onClick={logoutUser}>
            Logout
          </Link>
        </li>
      </>
    );
  };

  return (
    <header>
      <div className="menu">
        <img src={Menu} alt="" width="30" />
      </div>
      {/* Logo */}
      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? "Admin" : "DevAT Shop"}</Link>
        </h1>
      </div>
      {/* Menu */}
      <ul>
        <li>
          <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
        </li>

        {isAdmin && adminRouter()}

        {isLogged ? (
          loggedRouter()
        ) : (
          <li>
            <Link to="/login">Login ✥ Register</Link>
          </li>
        )}

        <li>
          <img src={Close} alt="" width="30" className="menu" />
        </li>
      </ul>

      {isAdmin ? (
        ""
      ) : (
        <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart">
            <img src={Cart} alt="" width="30" />
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
// Film 12   (04:25 - 22:53)  13:00 ok
