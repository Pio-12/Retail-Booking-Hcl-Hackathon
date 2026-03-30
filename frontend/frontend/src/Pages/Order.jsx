import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../styles/Order.css';

const Order = () => {
  const { cart, products, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Calculate total amount
  const subtotal = cart.reduce((acc, item) => {
    const product = products.find(p => p.id === item.foodItemId);
    return product ? acc + product.price * item.quantity : acc;
  }, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name.trim()) formErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      formErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      formErrors.phone = 'Phone must be 10 digits';
    }
    if (!formData.address.trim()) formErrors.address = 'Address is required';
    if (!formData.city.trim()) formErrors.city = 'City is required';
    if (!formData.pincode.trim()) formErrors.pincode = 'Pincode is required';

    return formErrors;
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Save "lastOrder" to localStorage
    const orderDetails = {
      items: cart.map(item => {
        const product = products.find(p => p.id === item.foodItemId);
        return product ? { ...product, quantity: item.quantity } : item;
      }),
      deliveryInfo: formData,
      totalAmount: total,
      date: new Date().toISOString()
    };
    localStorage.setItem('lastOrder', JSON.stringify(orderDetails));

    // Clear cart and redirect
    clearCart();
    navigate('/confirmation');
  };

  if (cart.length === 0) {
    return (
      <div className="order-empty">
        <h2>Your cart is empty.</h2>
        <button className="btn-primary" onClick={() => navigate('/menu')}>Back to Menu</button>
      </div>
    );
  }

  return (
    <div className="order-container">
      <h2>Checkout</h2>
      
      <div className="checkout-content">
        <form className="delivery-form" onSubmit={handleConfirmOrder}>
          <h3>Delivery Details</h3>
          
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input 
              type="tel" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label>Address</label>
            <input 
              type="text" 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input 
                type="text" 
                name="city" 
                value={formData.city} 
                onChange={handleChange} 
              />
              {errors.city && <span className="error">{errors.city}</span>}
            </div>
            <div className="form-group">
              <label>Pincode</label>
              <input 
                type="text" 
                name="pincode" 
                value={formData.pincode} 
                onChange={handleChange} 
              />
              {errors.pincode && <span className="error">{errors.pincode}</span>}
            </div>
          </div>

          <button type="submit" className="btn-primary confirm-btn">
            Confirm Order
          </button>
          {/* TODO: POST /api/orders — send order to backend */}
        </form>

        <div className="order-summary-box">
          <h3>Your Order Summary</h3>
          <ul className="readonly-cart">
            {cart.map(item => {
              const product = products.find(p => p.id === item.foodItemId);
              return product ? (
                <li key={item.id} className="summary-item">
                  <span>{item.quantity}x {product.name}</span>
                  <span>${(product.price * item.quantity).toFixed(2)}</span>
                </li>
              ) : null;
            })}
          </ul>
          <div className="summary-totals">
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <h3 className="final-total">Total: ${total.toFixed(2)}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
