import React, { useContext, useState } from "react";
import "./Navbar.css";
import search_icon from "../../assets/search_icon.png";
import logo from "../../assets/logo.png";
import basket_icon from "../../assets/basket_icon.png";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/">
        {" "}
        <img src={logo} alt="" style={{ width: "200px", height: "50px" }} />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => {
            setMenu("home");
          }}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <Link
          to="/"
          onClick={() => {
            setMenu("menu");
            window.scrollTo({
              top: document.getElementById("explore-menu").offsetTop,
              behavior: "smooth",
            });
          }}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </Link>
        {/* The 'Menu' link will scroll to the 'explore-menu' section when clicked ...but if we are on cart..we first go to home and then click again for menu */}

        <Link
          to="/"
          onClick={() => {
            setMenu("mobile-app");
            window.scrollTo({
              top: document.getElementById("app-download").offsetTop,
              behavior: "smooth",
            });
          }}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile app
        </Link>

        <a
          href="#footer"
          onClick={() => {
            setMenu("contact-us");
          }}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact us
        </a>
      </ul>
      <div className="navbar-right">
        {/* <img src={search_icon} alt="" /> */}
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}> Sign In</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" /> <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
