import React from "react";
import {
  otherFilter,
  priceFilter,
  ratingFilter,
} from "../../Utils/Data/filterData";
import {
  CLEAR_FILTERS,
  SORT_BY_BRAND,
  SORT_BY_CATEGORY,
  SORT_BY_OTHER,
  SORT_BY_PRICE,
  SORT_BY_PRICE_RANGE,
  SORT_BY_RATING,
} from "../../Constant/constant";
import { categoryData } from "../../Utils/Data/categoryData";
import { brandData } from "../../Utils/Data/brandData";
import "./ProductFilters.css";
import { useProductContext } from "../../Hooks/useProductContext";

const ProductFilters = () => {
  const { productState, dispatchProduct } = useProductContext();
  const { price, priceRange, rating, category, brand, other } = productState;

  const dispatchFilterHandler = (type, data) =>
    dispatchProduct({
      type: type,
      payload: data,
    });

  return (
    <div className="sidebar custom-scrollbar">
      <ul className="list">
        <div className="list-header">
          <div className="list-title">Filters</div>
          <button
            id="clear-rating"
            className="h4 btn-link link-default"
            onClick={() => dispatchFilterHandler(CLEAR_FILTERS, "")}
          >
            Clear
          </button>
        </div>
        <br />
        <hr />
        <br />
        {/* Price Filter */}
        <li className="list-collapsable">
          <div className="h4">Price</div>
          <ul>
            {priceFilter.length > 0 &&
              priceFilter.map((item) => (
                <li key={item.id}>
                  <input
                    type="radio"
                    name={item.name}
                    id={item.id}
                    value={item.value}
                    checked={price === item.value ? true : false}
                    onChange={() =>
                      dispatchFilterHandler(SORT_BY_PRICE, item.value)
                    }
                  />
                  <label htmlFor={item.id}> {item.name}</label>
                </li>
              ))}
          </ul>
        </li>
        <br />
        <hr />
        <br />
        {/* Price Range */}
        <li className="list-collapsable">
          <div className="h4">Price Range</div>
          <div className="slider-container">
            <div className="output-section">
              <span className="output-start">0</span>
              <span className="output-end">{priceRange}</span>
            </div>

            <input
              type="range"
              min="0"
              max="200000"
              step="20000"
              value={priceRange}
              className="slider"
              id="myRange"
              onChange={(e) =>
                dispatchFilterHandler(
                  SORT_BY_PRICE_RANGE,
                  Number(e.target.value)
                )
              }
            />
          </div>
        </li>
        <br />
        <hr />
        <br />
        <li className="list-collapsable">
          <div className="h4">Ratings</div>
          <ul>
            {ratingFilter.length > 0 &&
              ratingFilter.map((item) => (
                <li key={item.id}>
                  <input
                    type="radio"
                    name={item.name}
                    id={item.id}
                    value="5"
                    checked={rating === item.value ? true : false}
                    onChange={() =>
                      dispatchFilterHandler(SORT_BY_RATING, item.value)
                    }
                  />
                  <label htmlFor={item.id}>
                    &nbsp;
                    <i htmlFor="rate-5" className="fas fa-star star-rating" />
                    &nbsp; {item.name}
                  </label>
                </li>
              ))}
          </ul>
        </li>
        <br />
        <hr />
        <br />
        <li className="list-collapsable">
          <div className="h4">Category</div>
          <ul>
            {categoryData.length > 0 &&
              categoryData.map((item) => (
                <li key={item.id} className="filter-checkbox">
                  <input
                    type="checkbox"
                    name={item?.categoryName}
                    id={`brand-${item?.categoryName}`}
                    value={item?.categoryName}
                    checked={
                      category.includes(item?.categoryName) ? true : false
                    }
                    onChange={() =>
                      dispatchFilterHandler(
                        SORT_BY_CATEGORY,
                        item?.categoryName
                      )
                    }
                  />
                  <label htmlFor={`brand-${item?.categoryName}`}>
                    {" "}
                    {item?.categoryName}
                  </label>
                </li>
              ))}
          </ul>
        </li>
        <br />
        <hr />
        <br />
        <li className="list-collapsable">
          <div className="h4">Brand</div>
          <ul>
            {brandData.length > 0 &&
              brandData.map((item) => (
                <li className="filter-checkbox" key={item.id}>
                  <input
                    type="checkbox"
                    name={item.brandName}
                    id={item.id}
                    value={item.brandName}
                    checked={brand.includes(item.brandName) ? true : false}
                    onChange={() =>
                      dispatchFilterHandler(SORT_BY_BRAND, item.brandName)
                    }
                  />
                  <label htmlFor={item.id}> {item.brandName}</label>
                </li>
              ))}
            <li className="filter-checkbox">
              <input
                type="checkbox"
                name="Other"
                id="brand-Other"
                value="Other"
                checked={brand.includes("Other") ? true : false}
                onChange={() => dispatchFilterHandler(SORT_BY_BRAND, "Other")}
              />
              <label htmlFor="brand-Other"> Other</label>
            </li>
          </ul>
        </li>
        <br />
        <hr />
        <br />
        <li className="list-collapsable">
          <div className="h4">Other</div>
          <ul>
            {otherFilter.length > 0 &&
              otherFilter.map((item) => (
                <li className="filter-checkbox" key={item.id}>
                  <input
                    type="checkbox"
                    name={item.name}
                    id={item.id}
                    value={item.value}
                    checked={other.includes(item.value) ? true : false}
                    onChange={() =>
                      dispatchFilterHandler(SORT_BY_OTHER, item.value)
                    }
                  />
                  <label htmlFor={item.id}> {item.name}</label>
                </li>
              ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default ProductFilters;
