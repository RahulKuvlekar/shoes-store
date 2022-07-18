import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ViewProduct.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Config/InitFirebase";
import { DANGER, SHOES_STORE_POST } from "../../Constant/constant";
import { useToastContext } from "../../Hooks/useToastContext";
import { createToast } from "../../Utils/toast";
import ProductImageSlider from "../../Components/ProductImageSlider/ProductImageSlider";
import { v4 as uuid } from "uuid";
import { getDiscountedPrice } from "../../Utils/products";
import {
  FaTruck,
  FaCheckSquare,
  FaRegCalendarCheck,
  FaRegCalendarTimes,
} from "react-icons/fa";
import RatingStar from "../../Components/RatingStar/RatingStar";

const ViewProduct = () => {
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState();
  const [productImagesData, setProductImagesData] = useState([]);
  const { dispatchToast } = useToastContext();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const docRef = doc(db, SHOES_STORE_POST, productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists) {
          const data = docSnap.data();
          setProductData(data);
          setProductImagesData(
            data.productImages.map((data) => ({
              image: data,
              id: uuid(),
            }))
          );
        }
      } catch (error) {
        dispatchToast(createToast(DANGER, error.message));
      } finally {
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, [productId]);

  return (
    <div className="main-section viewProduct-section ">
      <div className="viewProduct-imageSection">
        {productImagesData?.length > 0 && (
          <ProductImageSlider data={productImagesData} />
        )}
      </div>
      {productData && (
        <div className="viewProduct-description">
          <h1 className="viewProduct-title">{productData.title}</h1>
          <h3 className="viewProduct-subtitle">{productData.subtitle}</h3>
          <RatingStar rating={productData.rating} />
          <div className="viewProduct-priceSection">
            <span className="viewProduct-price-now">
              {getDiscountedPrice(productData.price, productData.discount)}
            </span>
            <span className="viewProduct-price-before">
              {productData.price}
            </span>
            <span className="viewProduct-discount">
              ( {productData.discount}% OFF )
            </span>
          </div>
          <h4 className="viewProduct-taxes">Inclusive of all taxes</h4>
          <hr />
          <div className="viewProduct-productDescription">
            <h4>Product Details :- </h4>
            {productData.description}
          </div>
          <hr />
          <div className="viewProduct-info">
            <p>
              <FaTruck className="flip-image" />
              {productData.fastDelivery
                ? "Fast delivery available"
                : "Upto 7 days delivery"}
            </p>
            <p>
              <FaCheckSquare />
              Price displayed is inclusive of GST
            </p>
            <p>
              {productData.inStock ? (
                <FaRegCalendarCheck />
              ) : (
                <FaRegCalendarTimes />
              )}
              {productData.inStock
                ? "Currently in stock"
                : "Currently in Out of stock"}
            </p>
          </div>
          <span className="viewProduct-btns">
            <button className="btn btn-primary">
              Add to cart
              <i class="btn-icon-after fas fa-shopping-cart"></i>
            </button>
            <button className="btn btn-warning">
              Add to Wishlist
              <i class="btn-icon-after fas fa-heart"></i>
            </button>
          </span>
        </div>
      )}
    </div>
  );
};

export default ViewProduct;
