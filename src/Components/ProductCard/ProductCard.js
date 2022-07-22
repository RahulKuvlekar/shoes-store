import React from "react";
import RatingStar from "../RatingStar/RatingStar";
import "./ProductCard.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useProductContext } from "../../Hooks/useProductContext";
import { useAuthContext } from "../../Hooks/useAuthContext";
import {
  addToMyCart,
  addToMyWishlist,
  getDiscountedPrice,
  removeFromMyWishlist,
} from "../../Utils/products";

const ProductCard = ({ product }) => {
  const {
    productId,
    title,
    subtitle,
    image,
    featured,
    inStock,
    price,
    discount,
    discountedPrice,
    rating,
    fastDelivery,
  } = product;

  const location = useLocation();
  const navigate = useNavigate();

  const {
    productState: { productLoading, myCart, myWishlist },
    dispatchProduct,
  } = useProductContext();

  const { isAuthenticated, userInfo } = useAuthContext();

  const productInWishlist = myWishlist[productId] ? true : false;

  const productInCart = myCart[productId] ? true : false;

  const viewProducthandler = () => {
    navigate(`/products/${productId}`);
  };

  const addToCartHandler = () => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: location },
        replace: true,
      });
    } else {
      addToMyCart(dispatchProduct, product, userInfo.uid);
    }
  };

  const goToCartHandler = () => {
    navigate("/cart");
  };

  const addToWishlistHandler = () => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: location },
        replace: true,
      });
    } else {
      addToMyWishlist(dispatchProduct, product, userInfo.uid);
    }
  };

  const removeFromWishlistHandler = () => {
    removeFromMyWishlist(dispatchProduct, product, userInfo.uid);
  };

  return (
    <div
      className={`card-container ${!inStock ? "card-overlay" : null}`}
      id={`product-card-${productId}`}
    >
      {!inStock && (
        <div className="card-overlay-content">
          <h1>Out Of Stock</h1>
        </div>
      )}
      <img
        className="card-img"
        src={image}
        alt={title}
        onClick={viewProducthandler}
      />
      {featured && <div className="card-badge card-badge-danger">Trending</div>}
      {productInWishlist ? (
        <button
          className="card-btn-wishlist"
          onClick={removeFromWishlistHandler}
          disabled={productLoading}
        >
          <i className="btn-icon fa-solid fa-heart fa-pink"></i>
        </button>
      ) : (
        <button
          className="card-btn-wishlist"
          onClick={addToWishlistHandler}
          disabled={productLoading}
        >
          <i className="btn-icon fa-regular fa-heart"></i>
        </button>
      )}
      <div className="card-content">
        {title && (
          <h3 className="card-title" onClick={viewProducthandler}>
            {title}
          </h3>
        )}
        {subtitle && <p className="card-text">{subtitle.toUpperCase()}</p>}
        <div className="card-price">
          <span className="price-now">
            ₹{" "}
            {discountedPrice
              ? discountedPrice
              : getDiscountedPrice(price, discount)}
          </span>
          <span className="price-before"> ₹{price} </span>
          {discount && (
            <span className="price-discount"> ({discount}% OFF) </span>
          )}
        </div>
        <div className="card-other">
          <RatingStar rating={rating} />
          <p className="text-grey-lt text-md">
            {fastDelivery ? "Fast Delivery" : "Upto 7 days"}
          </p>
        </div>
        <div className="btn-container">
          {productInCart ? (
            <button
              className="btn btn-success btn-noShadow"
              onClick={goToCartHandler}
              disabled={productLoading}
            >
              Go to cart
            </button>
          ) : (
            <button
              className="btn btn-primary btn-noShadow"
              onClick={addToCartHandler}
              disabled={productLoading}
            >
              Add to cart
            </button>
          )}
          {/* <button className="btn btn-outline-primary">Add to wishlist</button> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
