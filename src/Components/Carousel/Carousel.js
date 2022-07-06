import { useEffect, useState } from "react";
import "./Carousel.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Carousel = ({ data: imageData, height, width }) => {
  const [current, setCurrent] = useState(0);
  const dataLength = imageData.length;

  const prevImage = () => {
    setCurrent((prev) => (prev === 0 ? dataLength - 1 : prev - 1));
  };
  const nextImage = () => {
    setCurrent((prev) => (prev === dataLength - 1 ? 0 : prev + 1));
  };

  const moveImage = (idx) => setCurrent(idx);

  useEffect(() => {
    const timeOut = setTimeout(() => nextImage(), [2000]);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line
  }, [current]);

  if (!Array.isArray(imageData) || dataLength < 0) return null;

  return (
    <div className="carousel">
      {imageData &&
        imageData
          .filter((data, idx) => current === idx)
          .map((data, idx) => (
            <div
              key={`${idx}-carousel-data`}
              className="carousel-container"
              style={{ height, width }}
            >
              <img
                src={data.image}
                alt="carousals"
                className="img-responsive"
              />

              <FaAngleLeft className="carousel-leftArrow" onClick={prevImage} />
              <FaAngleRight
                className="carousel-rightArrow"
                onClick={nextImage}
              />
              <div className="container-dots">
                {Array.from({ length: dataLength }).map((item, index) => (
                  <div
                    onClick={() => moveImage(index)}
                    key={`${index}-carousel-dots`}
                    className={current === index ? "dot active" : "dot"}
                  ></div>
                ))}
              </div>
            </div>
          ))}
    </div>
  );
};

export default Carousel;
