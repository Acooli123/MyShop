import React, { useEffect, useState } from 'react';

export default function Order() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(savedOrders);
  }, []);

  const handleCancelOrder = (indexToRemove) => {
    const updatedOrders = orders.filter((_, index) => index !== indexToRemove);
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🧾 My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="d-flex flex-wrap gap-4 justify-content-center">
          {orders.map((order, index) => (
            <div className="card" style={{ width: "18rem" }} key={index}>
              <img
                src={order.image}
                className="card-img-top"
                alt={order.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{order.name}</h5>
                <p className="card-text">{order.description}</p>
                <p className="card-text fw-bold">₹ {order.price}</p>
                <p className="card-text text-muted" style={{ fontSize: '12px' }}>
                  Ordered at: {order.date}
                </p>
                <button
                  className="btn btn-danger btn-sm mt-2"
                  onClick={() => handleCancelOrder(index)}
                >
                  Cancel Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
