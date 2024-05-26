import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets.js";
const Navbar = () => {
  return (
    <div className="navbar">
      <img
        className="logo"
        src={assets.logo}
        alt=""
        style={{ width: "150px", height: "100px" }}
      />
      <img
        className="profile"
        src={assets.profile_image}
        alt=""
        style={{ width: "80px", height: "50px" }}
      />
    </div>
  );
};

export default Navbar;
