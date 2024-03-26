import { useState, useEffect } from "react";
import "../App.css";
import image1 from "../assets/PngItem_1519875.png";
import image2 from "../assets/PngItem_1519906.png";
import image3 from "../assets//PngItem_2190755.png";
import image4 from "../assets//PngItem_1519954.png";
import image5 from "../assets/PngItem_435438.png";

function ImageRotation() {
  const images = [image1, image2, image3, image4, image5];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Rotate images every 5 seconds

    // Clear interval after showing all images once
    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, images.length * 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [images.length]);

  return (
    <div className="image-container">
      {images.map((image, idx) => (
        <img
          key={idx}
          src={image}
          alt={`Image ${idx + 1}`}
          className={`image ${idx === index ? "active" : ""}`}
          style={{ animationDelay: `${idx * 5}s` }} // Delay animation for each image
        />
      ))}
    </div>
  );
}

export default ImageRotation;
