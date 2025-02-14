import { useEffect, useState } from "react";
import "../../styles/Carousel.css";

function Carousel({ images }) {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  let timeOut = null;

  useEffect(() => {
    if (autoPlay) {
      timeOut = setTimeout(() => {
        slideRight();
      }, 4500);
    }
    return () => clearTimeout(timeOut);
  });

  const slideRight = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const slideLeft = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div
      className="carousel"
      onMouseEnter={() => {
        setAutoPlay(false);
        clearTimeout(timeOut);
      }}
      onMouseLeave={() => {
        setAutoPlay(true);
      }}
    >
      <div
        className="carousel_wrapper"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, index) => (
          <div className="carousel_card" key={index}>
            <img className="card_image" src={img.image} alt={img.title} />
          </div>
        ))}
      </div>
      <div className="carousel_arrow_left" onClick={slideLeft}>
        &#8249;
      </div>
      <div className="carousel_arrow_right" onClick={slideRight}>
        &#8250;
      </div>
      <div className="carousel_pagination">
        {images.map((_, index) => (
          <div
            key={index}
            className={
              index === current
                ? "pagination_dot pagination_dot-active"
                : "pagination_dot"
            }
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
