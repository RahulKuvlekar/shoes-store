import React from "react";
import "./Skeleton.css";
import { v4 as uuid } from "uuid";
import Loader from "../Loader/Loader";
import SmallLoader from "../SmallLoader/SmallLoader";

const Skeleton = ({
  type = "Loader",
  counter = 1,
  color = "medium",
  size = "sm",
}) => {
  const CardSkeleton = () => (
    <div className="cardSkeleton">
      <div className="cardSkeleton-img"></div>
      <div className="cardSkeleton-heading"></div>
      <div className="cardSkeleton-price"></div>
      <div className="cardSkeleton-other"></div>
      <div className="cardSkeleton-btn"></div>
    </div>
  );

  const BannerSkeleton = () => <div className="bannerSkeleton"></div>;

  if (type === "Feed")
    return [...Array(counter)].map(() => (
      <CardSkeleton key={`skeleton-${uuid()}-${type}`} />
    ));
  else if (type === "banner") return <BannerSkeleton />;
  else if (type === "Loader") return <Loader color={color} />;
  else if (type === "SmallLoader") return <SmallLoader size={size} />;
};

export default Skeleton;
