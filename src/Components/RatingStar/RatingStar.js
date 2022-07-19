import React from "react";
import "./RatingStar.css";

const RatingStar = ({ rating = 3 }) => {
  const ratingStars = [...Array(5)];
  const starComponent = ratingStars.map((star, idx) =>
    idx < rating ? (
      <span key={`ratingStar-${idx}`}>
        <i className="fa-solid fa-star"></i>
      </span>
    ) : (
      <span key={`ratingStar-${idx}`}>
        <i className="fa-regular fa-star"></i>
      </span>
    )
  );

  return <div className="ratingStar-section">{starComponent}</div>;
};

export default RatingStar;
