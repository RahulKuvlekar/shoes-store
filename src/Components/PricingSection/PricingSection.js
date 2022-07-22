import React from "react";
import "./PricingSection.css";
import { useProductContext } from "../../Hooks/useProductContext";

const PricingSection = () => {
  const {
    productState: { myCart },
  } = useProductContext();

  const TOTAL_PRICE = Object.values(myCart).reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );
  const TOTAL_DISCOUNT = Object.values(myCart).reduce(
    (acc, curr) => acc + (curr.price - curr.discountedPrice) * curr.quantity,
    0
  );

  return (
    <div className="price-section">
      <h1 className="price-title">Price Details</h1>
      <br />
      <hr />
      <br />

      {/* list   */}
      <ul className="list item-list">
        {Object.values(myCart).length > 0 &&
          Object.values(myCart).map(({ title, price, quantity, productId }) => (
            <li
              className="price-list text-grey-md"
              key={`PriceSection-Item-${productId}`}
            >
              <span>{title}</span>
              <span>
                ₹{price} * {quantity}
              </span>
            </li>
          ))}
      </ul>

      <hr />

      <ul className="list">
        <li className="price-list text-grey-md">
          <h4>Total MRP</h4>
          <h4>₹ {TOTAL_PRICE.toFixed(2)}</h4>
        </li>

        <li className="price-list text-grey-md">
          <h4>Discount on MRP</h4>
          <h4>₹ {TOTAL_DISCOUNT.toFixed(2)}</h4>
        </li>

        <li className="price-list text-grey-md">
          <h4>Convenience Fee</h4>
          <h4>
            <span className="text-strike">₹199 </span>
            <span className="text-success">FREE</span>
          </h4>
        </li>

        <hr />
        <br />
        <div className="price-list">
          <span className="h3 text-grey-dk">Total Amount</span>
          <span className="h3 text-grey-dk">
            ₹ {(TOTAL_PRICE - TOTAL_DISCOUNT).toFixed(0)}
          </span>
        </div>
      </ul>
      <br />
      <hr />
      <button className="btn btn-success btn-place-order">Place Order</button>
    </div>
  );
};

export default PricingSection;
