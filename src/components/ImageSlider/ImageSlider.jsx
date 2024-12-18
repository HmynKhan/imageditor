import React, { useEffect, useState } from "react";
import "./styles.css";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

const ImageSlider = ({ url, limit = 5, page = 1 }) => {
  const [images, SetImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [errormsg, setErrormsg] = useState(null);
  const [loading, setloading] = useState(false);

  async function fetchImages(getUrl) {
    try {
      setloading(true);
      const res = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      const data = await res.json();

      if (data) {
        SetImages(data);
        setloading(false);
      }
    } catch (error) {
      setErrormsg(error.message);
      setloading(false);
    }
  }
  useEffect(() => {
    if (url !== "") fetchImages(url);
  }, [url]);

  function handleNext() {
    setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
  }
  function handlePrevious() {
    setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
  }

  if (loading) {
    return <div>loading...</div>;
  }

  if (errormsg !== null) {
    return <div>Error occured ! {errormsg}</div>;
  }

  return (
    <div className="container">
      <BsArrowLeftCircleFill
        onClick={handlePrevious}
        className="arrow arrow-left"
      />
      {images && images.length
        ? images.map((item, index) => (
            <img
              key={item.id}
              src={item.download_url}
              alt={item.download_url}
              className={
                currentImage === index
                  ? "current-image"
                  : "current-image hide-current-image"
              }
            />
          ))
        : null}
      <BsArrowRightCircleFill
        onClick={handleNext}
        className="arrow arrow-right"
      />
      <span className="circle-indicator">
        {images && images.length
          ? images.map((_, index) => (
              <button
                key={index}
                className={
                  currentImage === index
                    ? "current-indicator"
                    : "current-indicator hide-current-indicator"
                }
                onClick={() => setCurrentImage(index)}
              ></button>
            ))
          : null}
      </span>
    </div>
  );
};

export default ImageSlider;
