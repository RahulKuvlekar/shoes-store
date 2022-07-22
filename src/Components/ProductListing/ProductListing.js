import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Config/InitFirebase";
import { ADD_PRODUCTS, SHOES_STORE_POST } from "../../Constant/constant";
import "./ProductListing.css";
import ProductCard from "../ProductCard/ProductCard";
import Skeleton from "../UI/Skeleton/Skeleton";
import { useProductContext } from "../../Hooks/useProductContext";
import {
  sortByBrand,
  sortByCategory,
  sortByOther,
  sortByPrice,
  sortByPriceRange,
  sortByRating,
} from "../../Utils/filters";
import { getDiscountedPrice } from "../../Utils/products";

const ProductListing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { productState, dispatchProduct } = useProductContext();
  const { products, price, priceRange, rating, category, brand, other } =
    productState;

  const sortedByPrice = sortByPrice(price, products);
  const sortedByPriceRange = sortByPriceRange(priceRange, sortedByPrice);
  const sortedByRating = sortByRating(rating, sortedByPriceRange);
  const sortedByCategories = sortByCategory(category, sortedByRating);
  const sortedByBrands = sortByBrand(brand, sortedByCategories);
  const sortedProducts = sortByOther(other, sortedByBrands);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const docRef = collection(db, SHOES_STORE_POST);
        const snapshotRef = await getDocs(docRef);
        let data = snapshotRef.docs.map((data) => ({
          productId: data.id,
          ...data.data(),
        }));
        // Added Discounted Price
        data = data.map((data) => ({
          ...data,
          discountedPrice: getDiscountedPrice(data.price, data.discount),
        }));

        dispatchProduct({ type: ADD_PRODUCTS, payload: data });
      } catch (error) {
        console.log("error ", error.message);
      } finally {
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="products-listing-section custom-scrollbar">
      <h3 className="page-title h2 text-grey-md">
        Showing Products ({sortedProducts.length})
      </h3>
      <div className="product-listing grid ">
        {isLoading ? (
          <Skeleton counter={10} type="Feed" />
        ) : sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))
        ) : (
          <div className="cart-empty">
            <h1 className="text-grey-dt">Oops! No product found :(</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
