import moment from "moment";
import React from "react";
import "./OrderCard.css";
import { v4 as uuid } from "uuid";
import { getDiscountedPrice } from "../../Utils/products";

const OrderCard = ({ orderData }) => {
  return (
    <div className="order-card">
      <h3 className="order-status">Order Confirmed</h3>
      <p className="text-grey-lt">
        {moment(orderData?.timestamp)?.format("DD MMM YYYY hh:mm A")}
      </p>
      <h4 className="text-grey-md">Order Id:- #{orderData.orderId}</h4>
      <h4 className="text-grey-md">
        Total :- ₹ {orderData.totalDiscountPrice}
      </h4>
      <h4 className="text-grey-md">Payment Mode :- {orderData.paymentMode}</h4>
      <div className="order-delivery">
        <h4 className="text-grey-md">Delivered To:- </h4>
        <div>
          <h4 className="text-grey-md">{orderData.userInfo.fullname}</h4>
          <h4 className="text-grey-md">
            {orderData.userInfo.street}, {orderData.userInfo.city},{" "}
            {orderData.userInfo.State}, {orderData.userInfo.country},{" "}
            {orderData.userInfo.zipcode}.{" "}
          </h4>
          <h4 className="text-grey-md">
            Mobile Number:- {orderData.userInfo.mobileNo},
          </h4>
        </div>
      </div>
      <h4 className="text-grey-md">Order Details:-</h4>
      <div>
        {orderData.items.map((product) => (
          <div key={`order-product-card-${uuid()}`} className="order-minicard">
            <img
              src={product.image}
              alt={product.brand}
              className="order-img"
            />
            <div className="order-description">
              <h4 className="text-grey-md">{product.title}</h4>
              <p className="text-grey-lt">{product.brand}</p>
              <h5 className="text-grey-md">Qty:- {product.quantity}</h5>
              <h4 className="text-grey-md order-pricesection">
                Price:-
                <div className="order-pricesection">
                  <span className="order-discountedPrice">
                    ₹{getDiscountedPrice(product.price, product.discount)}
                  </span>
                  <span className="order-price">₹{product.price}</span>
                  <span className="order-discount">
                    ( {product.discount}% )
                  </span>
                </div>
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderCard;
