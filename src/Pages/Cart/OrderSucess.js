import React from "react";
import "./OrderSuccess.css";
import { Link } from "react-router-dom";

const OrderSucess = ({ orderId }) => {
  return (
    <div className="confirmOrder-section">
      <img
        src="/Images/Extras/sucessPaymentIcon.gif"
        alt="SucessPaymentIcon"
        className="paymentSuccess-img"
      />
      <h2 className="text-success">Order Confirmed !</h2>
      <h3 className="text-grey-md">Order Id - {orderId}</h3>
      <h2 className="text-grey-md">Thank you for shopping with us!</h2>
      <div>
        <Link to="/products" className="btn btn-primary btn-noShadow">
          Buy More
        </Link>
        <Link to="/profile/order" className="btn btn-primary btn-noShadow">
          View Order
        </Link>
      </div>
    </div>
  );
};

export default OrderSucess;
