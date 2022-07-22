import React from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import "./Wishlist.css";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../../Hooks/useProductContext";

const Wishlist = () => {
  const {
    productState: { myWishlist },
  } = useProductContext();
  const navigate = useNavigate();

  const startShoppingHandler = () => navigate("/products");

  return (
    <div>
      <h1 className="page-title page-title-center">
        My Wishlist{" "}
        {Object.values(myWishlist).length
          ? `( ${Object.values(myWishlist).length} )`
          : ""}
      </h1>
      <div className="wishlist grid">
        {Object.values(myWishlist).length > 0 ? (
          Object.values(myWishlist).map((product) => (
            <ProductCard
              product={product}
              key={`WishlistCard-${product?.productId}`}
            />
          ))
        ) : (
          <div className="cart-empty">
            <h1>Oops! Your Wishlist is empty :(</h1>
            <button
              className="btn-link link-primary"
              onClick={startShoppingHandler}
            >
              Start Shopping ?
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
