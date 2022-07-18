import React from "react";
import ProductFilters from "../../Components/ProductFilters/ProductFilters";
import ProductListing from "../../Components/ProductListing/ProductListing";
import "./Products.css";
const Products = () => {
  return (
    <div>
      {/* Temp hide Responsive-Heading */}
      {/* <div className="product-heading display-sm">
        <div>Showing All Products</div>
        <i id="show-filter" className="fa-solid fa-filter" />
        <i
          id="hide-filter"
          className="deactive fa-solid fa-filter-circle-xmark"
        />
      </div> */}
      <div className="products grid">
        <ProductFilters />
        <ProductListing />
      </div>
    </div>
  );
};

export default Products;
