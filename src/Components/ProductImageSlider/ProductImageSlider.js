import React, { useState, useMemo } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import "./ProductImageSlider.css";

const ProductImageSlider = ({ data: productImages = [] }) => {
  const [current, setCurrent] = useState(0);
  const SlideLength = useMemo(() => productImages.length, [productImages]);

  const prevImage = () => {
    setCurrent((prev) => (prev === 0 ? SlideLength - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrent((prev) => (prev === SlideLength - 1 ? 0 : prev + 1));
  };

  const showCurrentImage = (idx) => setCurrent(idx);

  return (
    <React.Fragment>
      <div className="productImageSlider-mainImage">
        {productImages &&
          productImages
            .filter((photo, idx) => idx === current)
            .map((photo) => (
              <img
                src={photo.image}
                alt={`productImage-${photo.id}`}
                key={`productImageSlider-${photo.id}`}
              />
            ))}
        <div className="productImageSlider-btns">
          <FaAngleLeft
            className="productImageSlider-leftBtn"
            onClick={prevImage}
          />
          <FaAngleRight
            className="productImageSlider-rightBtn"
            onClick={nextImage}
          />
        </div>
      </div>
      <div className="productImageSlider-previewSection">
        {productImages &&
          productImages?.map((photo, idx) => (
            <div
              key={`productImageSlider-preview-${photo.id}`}
              className={`productImageSlider-preview ${
                idx === current ? "productImageSlider-previewActive" : ""
              }`}
            >
              <img
                src={photo.image}
                alt="Product_Preview"
                onClick={() => showCurrentImage(idx)}
              />
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};

export default ProductImageSlider;
