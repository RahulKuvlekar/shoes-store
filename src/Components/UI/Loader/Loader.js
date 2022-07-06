import React from "react";
import "./Loader.css";

const Loader = ({ color = "medium" }) => {
  const getLoaderImg = () => {
    if (color === "light") return "loaderLight.svg";
    else if (color === "dark") return "loaderDark.svg";
    else return "loaderMedium.svg";
  };
  return (
    <div className="loader">
      <img src={`/Images/Extras/${getLoaderImg()}`} alt="Loading....." />
    </div>
  );
};

export default Loader;
