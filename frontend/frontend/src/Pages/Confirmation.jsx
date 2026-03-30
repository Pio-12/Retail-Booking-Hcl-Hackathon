import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Confirmation.css';

const Confirmation = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  // Generate a fake Order ID
  const generateOrderID = () => {
    const randomHex = Math.floor(Math.random() * 16777215).toString(16).toUpperCase();
    return `#QB-2024-${randomHex.padStart(6, '0')}`;
  };

  useEffect(() => {
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
      setOrder(JSON.parse(lastOrder));
    }
  }, []);

  if (!order) {
    return (
      <div className="confirmation-container no-order">
        <h2>No Recent Orders Found</h2>
        <button className="btn-primary" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  const { deliveryInfo, items, totalAmount } = order;

  return (
    <div className="confirmation-container">
      <div className="success-message">
        <h1>🎉 Order Placed Successfully!</h1>
        <p>Thank you for shopping with QuickBite.</p>
        <h2 className="order-id">Order ID: {generateOrderID()}</h2>
      </div>

      <div className="confirmation-details">
        <div className="section delivery-address">
          <h3>Delivery Address</h3>
          <p><strong>Name:</strong> {deliveryInfo.name}</p>
          <p><strong>Phone:</strong> {deliveryInfo.phone}</p>
          <p><strong>Address:</strong> {deliveryInfo.address}, {deliveryInfo.city} - {deliveryInfo.pincode}</p>
        </div>

        <div className="section items-ordered">
          <h3>Items Ordered</h3>
          <ul>
            {items.map(item => (
              <li key={item.id}>
                <span>{item.quantity}x {item.name} ({item.category})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="section total-paid">
          <h3>Total Paid</h3>
          <p className="total-amount">${totalAmount.toFixed(2)}</p>
        </div>
      </div>

      <button className="btn-primary btn-home" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
};

export default Confirmation;
