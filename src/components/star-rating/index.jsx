import { useState } from "react";
import "./star.css";

export default function StarRating({ noOfStars = 5 }) {
  const [starRating, setStarRating] = useState(0);
  const [onHover, setOnHover] = useState(0);

  function handleStarRating(getCurrentIndex) {
    setStarRating(getCurrentIndex);
  }
  function handleMouseEnter(getCurrentIndex) {
    setOnHover(getCurrentIndex);
  }
  function handleMouseLeave() {
    setOnHover(starRating);
  }

  return (
    <div className="wrapper-container">
      <div className="star-rating">
        {[...Array(noOfStars)].map((_, index) => {
          index += 1;

          return (
            <div
              key={index}
              className={
                index <= (onHover|| starRating ) ? "active" : "inactive"
              }
              onClick={() => handleStarRating(index)}
              onMouseMove={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              star
            </div>
          );
        })}
      </div>
    </div>
  );
}
