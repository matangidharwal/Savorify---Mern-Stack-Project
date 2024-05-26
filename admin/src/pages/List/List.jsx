import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
const List = ({ url }) => {
  const [list, setList] = useState([]);
  const fetchlist = async () => {
    // Fetching all the food items from the database
    const response = await axios.get(`${url}/api/food/list`);

    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("ERROR");
    }
  };

  const removeFood = async (foodId) => {
    // Deleting the food item from the database
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchlist();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("ERROR");
    }
    // Fetching the list of food items after deleting the food item
  };

  useEffect(() => {
    // Fetching the list of food items when the component is mounted
    fetchlist();
  }, []);
  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <p onClick={() => removeFood(item._id)} className="cursor">
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
