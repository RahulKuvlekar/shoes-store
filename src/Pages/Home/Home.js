import React, { useEffect, useState } from "react";
import "./Home.css";
import { BsLock, BsUmbrella } from "react-icons/bs";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import Carousel from "../../Components/Carousel/Carousel";
import { carouselData } from "../../Utils/Data/carouselData";
import { brandData } from "../../Utils/Data/brandData";
import RowSlider from "../../Components/UI/RowSilder/RowSlider";
import { Link, useNavigate } from "react-router-dom";
import { categoryData } from "../../Utils/Data/categoryData";
import Skeleton from "../../Components/UI/Skeleton/Skeleton";
import { useProductContext } from "../../Hooks/useProductContext";
import {
  CLEAR_FILTERS,
  SORT_BY_BRAND,
  SORT_BY_CATEGORY,
} from "../../Constant/constant";

const Home = () => {
  const [bannerLoader, setBannerLoader] = useState(true);
  const { dispatchProduct } = useProductContext();
  const navigate = useNavigate();
  const categorySliderData = categoryData.map(
    ({ categoryName, categoryImage }) => ({
      name: categoryName,
      img: categoryImage,
    })
  );

  const categoryOnClickHandler = (event, name) => {
    dispatchProduct({ type: SORT_BY_CATEGORY, payload: name });
    navigate("/products");
  };

  const brandRowSliderData = brandData.map(({ brandName, brandImage }) => ({
    name: brandName,
    img: brandImage,
  }));

  const brandOnClickHandler = (event, name) => {
    dispatchProduct({ type: SORT_BY_BRAND, payload: name });
    navigate("/products");
  };

  useEffect(() => {
    dispatchProduct({ type: CLEAR_FILTERS });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="main-section">
      {bannerLoader && <Skeleton type="banner" />}
      <div className={`bg-black ${bannerLoader ? "display-none" : ""}`}>
        <img
          src="/Images/HomeBanner.jpeg"
          alt="home-banner"
          onLoad={() => setBannerLoader(false)}
          className="home-banner img-responsive"
        />
        <div className="overlay-container">
          <h1>CLEARANCE SALE</h1>
          <h3>UPTO 30% OFF on various products</h3>
          <Link to="/products" className="btn btn-default btn-overlay">
            Shop Now
          </Link>
        </div>
      </div>
      <Carousel data={carouselData} height="75vh" />
      {brandData?.length > 0 && (
        <RowSlider
          title="Brand"
          data={brandRowSliderData}
          card={false}
          onClick={brandOnClickHandler}
        />
      )}
      {categorySliderData?.length > 0 && (
        <RowSlider
          title="Category"
          data={categorySliderData}
          card={true}
          onClick={categoryOnClickHandler}
        />
      )}
      <div className="services-category">
        <div className="services-category-card">
          <VscWorkspaceTrusted />
          <p className="services-category-title">Trust</p>
        </div>
        <div className="services-category-card">
          <BsLock />
          <p className="services-category-title">Secure Payment</p>
        </div>
        <div className="services-category-card">
          <BsUmbrella />
          <p className="services-category-title">Legitimacy</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
