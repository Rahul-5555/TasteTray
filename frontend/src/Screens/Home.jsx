import React, { useEffect, useState } from 'react';
import Card from '../Components/Card';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const loadData = async () => {
    try {
      let response = await fetch("https://tastetray-1.onrender.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();
      setFoodItem(response[0] || []);
      setFoodCat(response[1] || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 3); // Loop through 3 slides
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + 3) % 3
    ); // Loop through 3 slides in reverse
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Auto slide every 3 seconds
    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const carouselImages = [
    "https://cdn.britannica.com/35/225835-050-A5CC289A/Indian-one-pot-meal-for-party.jpg",
    "https://static.wixstatic.com/media/91e241_475faa4fa56341f3878699dde5ab4904~mv2.jpg/v1/fill/w_666,h_444,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/91e241_475faa4fa56341f3878699dde5ab4904~mv2.jpg",
    "https://codetheorem.co/blogs/wp-content/uploads/2022/10/Food-Delivery-App.jpg"
  ];

  return (
    <div>
      <Navbar />

      {/* Carousel */}
      <div style={{ position: 'relative', width: '100%', height: '700px', overflow: 'hidden' }}>
        <div
          style={{
            display: 'flex',
            transition: 'transform 0.5s ease-in-out',
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {carouselImages.map((image, index) => (
            <div key={index} style={{ width: '100%', flexShrink: 0 }}>
              <img
                src={image}
                alt="Fresh pastry"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(100%)',
                }}
              />
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          style={{
            position: 'absolute',
            top: '50%',
            left: '10px',
            transform: 'translateY(-50%)',
            background: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            border: 'none',
            padding: '10px',
            fontSize: '24px',
            cursor: 'pointer',
          }}
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          style={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            background: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            border: 'none',
            padding: '10px',
            fontSize: '24px',
            cursor: 'pointer',
          }}
        >
          &#10095;
        </button>
      </div>

      {/* Search Bar */}
      <div className="container mt-3">
        <div className='d-flex justify-content-center'>
          <input
            className='form-control me-2'
            placeholder='Search'
            aria-label='Search'
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className='btn btn-outline-success text-white bg-success rounded-full '
            type='button'
            onClick={() => { }}
          >
            Search
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className='container'>
        {foodCat.length !== 0 && foodCat.map((data) => (
          <div key={data._id} className='row mb-3'>
            <div className='fs-3 m-3'>{data.CategoryName}</div>
            <hr />
            {foodItem.length !== 0 ? (
              foodItem
                .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                .map((filterItems) => (
                  <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                    <Card foodItem={filterItems} options={filterItems.options[0]} />
                  </div>
                ))
            ) : (
              <div>No such data found</div>
            )}
          </div>
        ))}
        {foodCat.length === 0 && <div>No data available</div>}
      </div>
      <Footer />
    </div>
  );
}