import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  // i made these addtocart and removetocart cz ye nhi hote context provider se to hr component me add and remove ke alg states bnte..now we can use these functions in any component
  const url = "https://savorify.onrender.com";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    // Declaring a function named 'addToCart' that takes an 'itemId' parameter
    if (!cartItems[itemId]) {
      // Checking if the 'itemId' does not exist in the 'cartItems' object
      setCartItems((prev) => ({ ...prev, [itemId]: 1 })); // If the 'itemId' does not exist, add it to the 'cartItems' object with a quantity of 1
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 })); // If the 'itemId' already exists, increment its quantity by 1
    }
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    setFoodList(response.data.data);
  };

  //fetch cart data from the server and set it to the cartItems state so even after refreshing the page the cart items should be there
  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const token = localStorage.getItem("token");
      if (token) {
        setToken(token);
        //even after refreshing the page the cart items should be there so we need to load the cart data from the server
        await loadCartData(token);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    setCartItems,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
