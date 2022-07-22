import React from "react";
import "./CartCard.css";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useProductContext } from "../../Hooks/useProductContext";
import {
  addToMyWishlist,
  removeFromMyCart,
  updateMyCart,
} from "../../Utils/products";
import { useNavigate } from "react-router-dom";

const CartCard = ({ product }) => {
  const {
    productId,
    title,
    subtitle,
    Description,
    image,
    featured,
    quantity,
    price,
    discount,
    discountedPrice,
  } = product;

  const { userInfo } = useAuthContext();

  const {
    productState: { myWishlist, productLoading },
    dispatchProduct,
  } = useProductContext();

  const navigate = useNavigate();

  const incrementQuantity = () => {
    updateMyCart(dispatchProduct, product, userInfo.uid, "increment");
  };

  const decrementQuantity = () => {
    if (quantity <= 1) {
      removeFromMyCart(dispatchProduct, product, userInfo.uid);
      return;
    }
    updateMyCart(dispatchProduct, product, userInfo.uid, "decrement");
  };

  const removeFromCartHandler = () =>
    removeFromMyCart(dispatchProduct, product, userInfo.uid);

  const movetoWishlistHandler = () => {
    if (
      !Object.values(myWishlist).find(
        (product) => product.productId === productId
      )
    )
      addToMyWishlist(dispatchProduct, product, userInfo.uid);

    removeFromCartHandler();
  };

  const viewProductHandler = () => navigate(`/products/${productId}`);

  return (
    <div className="card-container card-horizontal">
      <img
        className="card-img"
        src={image}
        alt={title}
        onClick={viewProductHandler}
      />
      {featured && <div className="card-badge card-badge-danger">Trending</div>}
      <button className="card-btn-dismiss" onClick={removeFromCartHandler}>
        <i className="btn-icon fa-solid fa-trash-can"></i>
      </button>
      <div className="card-content">
        {title && (
          <h3 className="card-title text-grey-dk" onClick={viewProductHandler}>
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="card-text">
            {subtitle} {Description ? `| ${Description}` : null}.
          </p>
        )}

        <div className="card-price">
          {price && (
            <span className="price-now text-grey-dk">₹ {discountedPrice}</span>
          )}
          <span className="price-before"> ₹{price} </span>
          {discount && (
            <span className="price-discount"> ({discount}% OFF) </span>
          )}
        </div>
        <div className="btn-container">
          <div className="btn-quantity">
            <button
              className="btn btn-outline-primary btn-noShadow"
              onClick={decrementQuantity}
              disabled={productLoading}
            >
              {quantity > 1 ? (
                <i className="fas fa-minus"></i>
              ) : (
                <i className="fas fa-trash-can"></i>
              )}
            </button>

            <span>{quantity}</span>
            <button
              className="btn btn-outline-primary btn-noShadow"
              onClick={incrementQuantity}
              disabled={productLoading}
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
          <button
            className="btn btn-warning btn-noShadow"
            onClick={movetoWishlistHandler}
            disabled={productLoading}
          >
            Move to wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
