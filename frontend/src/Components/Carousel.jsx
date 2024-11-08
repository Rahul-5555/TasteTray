import React, { useState, useEffect } from 'react';
import './Carousel.css';  // Custom CSS for styling

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [
    "https://images.unsplash.com/photo-1594007658203-4b3f89e52b3d",
    "https://source.unsplash.com/random/900x700?burger",
    "https://source.unsplash.com/random/900x700?pastry"
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Auto slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-container">
      <div className="carousel-slides">
        <div
          className="carousel-slide"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <div className="carousel-item" key={index}>
              <img
                src={image}
                alt={`slide-${index}`}
                className="carousel-image"
              />
              {index === activeIndex && (
                <div className="carousel-caption">
                  <form className="d-flex">
                    <input
                      className="form-control me-2"
                      placeholder="Search"
                      aria-label="Search"
                      type="search"
                    />
                    <button className="btn btn-outline-success" type="submit">
                      Search
                    </button>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <button className="carousel-control-prev" onClick={prevSlide}>
        <span>&#10094;</span>
      </button>
      <button className="carousel-control-next" onClick={nextSlide}>
        <span>&#10095;</span>
      </button>
    </div>
  );
};

export default Carousel;
