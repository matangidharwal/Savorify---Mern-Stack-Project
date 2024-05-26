import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

// FoodItem component takes in props: id, name, price, description, and image
const FoodItem = ({ id, name, price, description, image }) => {
  // Access the cartItems, addToCart, and removeFromCart functions from the StoreContext
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        {/* Display the food item image */}
        <img
          className="food-item-image"
          src={url + "/images/" + image}
          alt=""
        />
        {!cartItems[id] ? (
          // If the food item is not in the cart, display the add icon
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          // If the food item is in the cart, display the counter with remove and add icons
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p style={{ color: "white" }}>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        {/* Display the food item description */}
        <p className="food-item-description">{description}</p>
        <div className="food-item-price">
          {/* Display the food item price */}
          <p>₹{price}</p>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
