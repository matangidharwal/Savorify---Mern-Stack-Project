import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import ExploreMenu from "../ExploreMenu/ExploreMenu";
import header_img from "../../assets/header_img.jpg";
const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Indulge in a culinary journey from the comfort of your home with our
          food delivery app. From savory delights to sweet sensations, we bring
          the flavors of your favorite restaurants right to your doorstep.
        </p>
        <button
          onClick={() => {
            window.location.href = "#explore-menu";
          }}
          className="header-button"
        >
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
