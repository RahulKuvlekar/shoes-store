import { useEffect } from "react";
import "./RowSlider.css";
import { useNavigate } from "react-router-dom";

const RowSlider = ({ title, data, card }) => {
  const navigate = useNavigate();
  const cardHandler = (data) => {
    navigate("/products");
  };

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  return (
    <div className={`row-slider ${card && "card-slider"}`}>
      <h1 className="row-slider-heading">{title}</h1>
      <ul className="row-slider-container">
        {data &&
          data.map(({ name, img }) => (
            <div
              key={`${name}-Row-Slider`}
              className="row-slider-wrapper"
              onClick={() => cardHandler(name)}
            >
              <img src={img} alt="" className="row-slider-img" />
              {card && <h1 className="row-slider-title">{name}</h1>}
            </div>
          ))}
      </ul>
    </div>
  );
};

export default RowSlider;
