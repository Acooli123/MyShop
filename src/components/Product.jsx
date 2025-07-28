import React, { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";

const Product = ({ name, price, image, description, onCartChange }) => {
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("user");

  const handleToggleCart = () => {
    // if (!isLoggedIn) {
    //   alert("Please login to add items to your cart.");
    //   navigate("/login");
    //   return;
    // }

    const newState = !isAdded;
    setIsAdded(newState);
    if (onCartChange) {
      onCartChange(newState); // true = add, false = remove
    }
  };

  const handleBuyNow = () => {
    // if (!isLoggedIn) {
    //   alert("Please login to buy this item.");
    //   navigate("/login");
    //   return;
    // }

    const order = {
      name,
      price,
      image,
      description,
      date: new Date().toLocaleString(),
    };

    
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    existingOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    alert(`You have bought "${name}" for ₹${price}!`);
  };

  function useQuery() {
      return new URLSearchParams(useLocation().search);
    }

  const searchTerm = useQuery().get("search");

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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            className="btn btn-primary"
            style={{ fontSize: 13 }}
            onClick={handleBuyNow}
          >
            Buy Now
          </button>

          <button
            className={`btn ${isAdded ? "btn-danger" : "btn-outline-primary"} mx-2`}
            onClick={handleToggleCart}
            style={{ fontSize: 13 }}
          >
            {isAdded ? "Remove from Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
