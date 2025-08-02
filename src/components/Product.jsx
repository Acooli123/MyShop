import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Product = ({ name, price, image, description, onCartChange }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // ✅ Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleToggleCart = () => {
    if (!isLoggedIn) {
      alert("🔒 Please login to add items to your cart.");
      navigate("/login");
      return;
    }

    const newState = !isAdded;
    setIsAdded(newState);

    const item = {
      name,
      price,
      image,
      description,
      quantity,
    };

    if (onCartChange) {
      onCartChange(newState, item);
    }
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      alert("🔒 Please login to buy this item.");
      navigate("/login");
      return;
    }

    const order = {
      name,
      price,
      image,
      description,
      quantity,
      totalPrice: price * quantity,
      date: new Date().toLocaleString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    existingOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    alert(`✅ You bought "${name}" x${quantity} for ₹${order.totalPrice}`);
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={image}
        className="card-img-top"
        alt={name}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text fw-bold">₹ {price}</p>

        <div className="d-flex align-items-center mb-2">
          <button
            className="btn btn-sm btn-outline-secondary me-2"
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            disabled={!isLoggedIn}
          >
            −
          </button>
          <span>{quantity}</span>
          <button
            className="btn btn-sm btn-outline-secondary ms-2"
            onClick={() => setQuantity(q => q + 1)}
            disabled={!isLoggedIn}
          >
            +
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            className="btn btn-primary"
            style={{ fontSize: 13 }}
            onClick={handleBuyNow}
            disabled={!isLoggedIn}
          >
            Buy Now
          </button>

          <button
            className={`btn ${isAdded ? "btn-danger" : "btn-outline-primary"} mx-2`}
            onClick={handleToggleCart}
            style={{ fontSize: 13 }}
            disabled={!isLoggedIn}
          >
            {isAdded ? "Remove from Cart" : "Add to Cart"}
          </button>
        </div>

        {!isLoggedIn && (
          <p className="text-danger mt-3" style={{ fontSize: "13px" }}>
            🔐 Login required to buy or add to cart. <a href="/login">Login now</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Product;
