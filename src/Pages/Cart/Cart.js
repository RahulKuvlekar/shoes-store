import React from "react";
import CartListing from "../../Components/CartListing/CartListing";
import PricingSection from "../../Components/PricingSection/PricingSection";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../../Hooks/useProductContext";

const Cart = () => {
  const {
    productState: { myCart },
  } = useProductContext();
  const navigate = useNavigate();

  const startShoppingHandler = () => navigate("/products");

  return (
    <div className="main-section custom-scrollbar">
      <h1 className="page-title page-title-center">
        My Cart{" "}
        {Object.values(myCart).length
          ? `( ${Object.values(myCart).length} )`
          : ""}
      </h1>
      {Object.values(myCart).length > 0 ? (
        <div className="cart grid">
          <CartListing />
          <PricingSection />
        </div>
      ) : (
        <div className="cart-empty">
          <h1>Oops! Your cart is empty :(</h1>
          <button
            className="btn-link link-primary"
            onClick={startShoppingHandler}
          >
            Start Shopping ?
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
