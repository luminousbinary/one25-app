import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./image-slider.css";

export default function ImageSlider({ url, page = 1, limit = 5 }) {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errMessage, setErrMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImages(getUrl) {
    try {
      setLoading(true);

      const res = await fetch(`${getUrl}?page=${page}&limit=${limit}`);

      const data = await res.json();

      // checking if the data is true... or if availabel
      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err.message);
      setErrMessage(err.message);
    }
  }

  useEffect(() => {
    if (url !== "") fetchImages(url);
  }, [url]);

  if (loading) {
    return <div>Image Loading... Please wait</div>;
  }

  if (errMessage !== null) {
    return <div> An error has occured: {errMessage}</div>;
  }

  function handlePrevius() {
    setCurrentSlide(currentSlide ===0 ? images.length -1:currentSlide-1)
  }

  function handleNext() {
    setCurrentSlide(currentSlide === images.length -1? 0 :currentSlide + 1)
    
  }
  console.log(images);
  return (
    <div>
      <div>Image Slider</div>
      <div className="image-slider-container">
        
        <BsArrowLeftCircleFill
          className="arrow-left arrow"
          onClick={() => handlePrevius()}
        />
 <div className="image-item">
        {images && images.length
          ? images.map((imageItem, index) => (
             
                <img
                  key={imageItem.id}
                  src={imageItem.download_url}
                  alt={imageItem.author}
                  className={currentSlide === index? "curent-image": "curent-image hide-current-image"}
                  width={"200px"}
                  height={"100px"}
                  
                />
           
            ))
          : null}
   </div>
        <BsArrowRightCircleFill
          className="arrow-right arrow"
          onClick={() => handleNext()}
        />
        <span className="circle-indicator">
          {images && images.length
            ? images.map((_, index) => (
                <button key={index}
                onClick={()=>setCurrentSlide(index)} className={currentSlide===index? "current-index": "current-index other-index"}></button>
              ))
            : null}
        </span>
      </div>
    </div>
  );
}
