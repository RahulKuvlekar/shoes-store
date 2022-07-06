import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUserAlt,
  FaShoppingCart,
  FaHeart,
  FaRegUserCircle,
} from "react-icons/fa";
import { HiOutlineShoppingCart, HiOutlineHeart } from "react-icons/hi";
import { BiUser, BiSearchAlt } from "react-icons/bi";
import "./NavigationBar.css";

const NavigationBar = () => {
  return (
    <header className="nav-bar">
      <nav className="nav-bar-container">
        <div className="nav-section jus">
          <div className="burger-menu">
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>

          <div className="nav-logo-title">
            <NavLink className="link-no-style nav-logo" to="/">
              <img src="./Images/mainLogo.png" alt="hipHop" />
            </NavLink>
          </div>
          <ul className="nav-pill nav-menu">
            <li className="list-inline-item">
              <NavLink to="/" className={`link-no-style`}>
                Home
              </NavLink>
            </li>
            <li className="list-inline-item">
              <NavLink to="/products" className={`link-no-style`}>
                Explore
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="nav-section">
          {/* <SearchBar /> */}
          {/* <label className="search-bar">
            <span className="search-bar-btn" type="submit">
              <i className="fa fa-search"> </i>
            </span>
            <input
              className="search-bar-input"
              type="text"
              placeholder="Type to search"
              name="search"
            />
          </label> */}

          <ul className="nav-pill nav-btn-icons">
            <li className="list-inline-item">
              <button className={`nav-icon-btn`}>
                <span className="nav-icon">
                  <BiSearchAlt />
                </span>
              </button>
            </li>
            <li className="list-inline-item">
              <NavLink to="/wishlist" className={`nav-icon-btn`}>
                <span className="nav-icon">
                  <HiOutlineHeart />
                </span>
              </NavLink>
            </li>
            <li className="list-inline-item">
              <NavLink to="/cart" className={`nav-icon-btn`}>
                <span className="nav-icon">
                  <HiOutlineShoppingCart />
                </span>
              </NavLink>
            </li>
            <li className="list-inline-item">
              <NavLink to="/cart" className={`nav-icon-btn`}>
                <span className="nav-icon">
                  <BiUser />
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavigationBar;
