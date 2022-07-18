// import { useRef } from "react";
import "./RowSlider.css";
import { useNavigate } from "react-router-dom";

const RowSlider = ({ title, data, card }) => {
  const cardHandler = (e, data) => {
    navigate("/products");
  };
  const navigate = useNavigate();

  // const sliderRef = useRef();
  // const isActive = useRef(false);
  // let startPosition;
  // let scrollDistance;

  // const mouseDownHandler = (e) => {
  //   isActive.current = true;
  //   startPosition = e.pageX - sliderRef.current.offsetLeft;
  //   scrollDistance = sliderRef.current.scrollLeft;
  // };
  // const mouseUpHandler = (e) => {
  //   isActive.current = false;
  // };
  // const mouseLeaveHandler = (e) => {
  //   isActive.current = false;
  // };
  // const mouseMoveHandler = (e) => {
  //   if (!isActive.current) return;
  //   e.preventDefault();
  //   const currentPosition = e.pageX - sliderRef.current.offsetLeft;
  //   const walk = currentPosition - startPosition;
  //   sliderRef.current.scrollLeft = scrollDistance - walk;
  // };

  return (
    <div className={`row-slider ${card && "card-slider"}`}>
      <h1 className="row-slider-heading">{title}</h1>
      <ul
        className="row-slider-container"
        // ref={sliderRef}
        // onMouseDown={mouseDownHandler}
        // onMouseUp={mouseUpHandler}
        // onMouseLeave={mouseLeaveHandler}
        // onMouseMove={mouseMoveHandler}
      >
        {data &&
          data.map(({ name, img }) => (
            <div
              key={`${name}-Row-Slider`}
              className="row-slider-wrapper"
              onClick={(e) => cardHandler(e, name)}
            >
              <img src={img} alt="" className="row-slider-img" />
            </div>
          ))}
      </ul>
    </div>
  );
};

export default RowSlider;
