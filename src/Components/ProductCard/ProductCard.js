import React from "react";
import RatingStar from "../RatingStar/RatingStar";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const productInWishlist = false;
  const productIsFound = false;

  const viewProducthandler = () => {
    navigate(`/products/${productId}`);
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
        <button className="card-btn-wishlist">
          <i className="btn-icon fa-solid fa-heart fa-pink"></i>
        </button>
      ) : (
        <button className="card-btn-wishlist">
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
          <span className="price-now">Rs.{discountedPrice}</span>
          <span className="price-before"> Rs.{price} </span>
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
          {productIsFound ? (
            <button className="btn btn-success">Go to cart</button>
          ) : (
            <button className="btn btn-primary btn-noShadow">
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
