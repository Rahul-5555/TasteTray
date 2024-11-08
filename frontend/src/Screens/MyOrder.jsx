import React, { useState } from 'react';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import Card from '../Components/Card';

const MyOrder = () => {
  // Remove unused state setters
  const [foodCat] = useState([]);
  const [foodItem] = useState([]);
  const [search] = useState('');

  return (
    <div className="body-container">
      <div>
        <Navbar />
      </div>
      <div className="container flex justify-center items-center h-screen">
        {foodCat.length !== 0 && foodCat.map((data) => (
          <div key={data._id} className="row mb-3">
            <div className="fs-3 m-3">{data.CategoryName}</div>
            <hr />
            {foodItem.length !== 0 ? (
              foodItem
                .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                .map((filterItems) => (
                  <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                    <Card foodItem={filterItems} options={filterItems.options[0]} />
                  </div>
                ))
            ) : (
              <div className=''>No such data found</div>
            )}
          </div>
        ))}
        {foodCat.length === 0 && <div>No data available</div>}
      </div>

      <div className="footer-container">
        <Footer className="" />
      </div>
    </div>
  );
};

export default MyOrder;
