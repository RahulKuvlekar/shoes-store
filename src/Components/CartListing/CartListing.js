import React from "react";
import "./CartListing.css";
import CartCard from "../CartCard/CartCard";
import { useProductContext } from "../../Hooks/useProductContext";
import Address from "../Address/Address";

const CartListing = () => {
  const {
    productState: { myCart },
  } = useProductContext();
  return (
    <div className="cart-section custom-scrollbar">
      <Address />
      {Object.values(myCart).map((product) => (
        <CartCard product={product} key={`CartCard-${product?.title}`} />
      ))}
    </div>
  );
};

export default CartListing;
