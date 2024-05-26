import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  // in this component, we will check the URL search params to see if the payment was successful or not
  // if the payment was successful, we will update the order in the database to mark it as paid
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const veryifyPayment = async () => {
    const response = await axios.post(url + "/api/order/verify", {
      success,
      orderId,
    });

    if (response.data.success) {
      navigate("/myorders");
      // if the payment was successful, we will redirect the user to the myorders page
    } else {
      navigate("/");
      // if the payment was not successful, we will redirect the user to the home page
    }
  };

  useEffect(() => {
    veryifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
