import React, { useEffect, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  const dispatch = useDispatchCart();
  const data = useCart();
  const options = props.options;
  const priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions[0] || "");
  let finalPrice = qty * parseInt(options[size]);

  const handleAddToCart = async () => {
    let food = data.find(item => item.id === props.foodItem._id);
    if (food && food.size === size) {
      await dispatch({ type: 'UPDATE', id: props.foodItem._id, price: finalPrice, qty: qty });
    } else {
      await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
    }
  };

  useEffect(() => {
    setSize(priceOptions[0] || "");
  }, [priceOptions]);

  return (
    <div className="">
      <div className="card shadow-sm rounded-lg overflow-hidden">
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt={props.foodItem.name}
          style={{
            height: '200px',
            objectFit: 'cover',
            maxWidth: '100%',
          }}
        />
        <div className="card-body text-center">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className="container d-flex justify-content-center align-items-center my-2">
            <select
              className="form-select me-2 w-auto"
              onChange={(e) => setQty(e.target.value)}
              value={qty}
            >
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>

            <select
              className="form-select me-2 w-auto"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            <div className="fs-5 text-success">₹{finalPrice}/-</div>
          </div>
          <hr />
          <button
            className="bg-red-600 btn btn-success w-100 mt-2 rounded-pill"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
