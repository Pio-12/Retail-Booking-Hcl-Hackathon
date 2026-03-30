import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../styles/Cart.css';

const Cart = () => {
  const { cart, products, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  // Calculate totals
  const subtotal = cart.reduce((acc, item) => {
    const product = products.find(p => p.id === item.foodItemId);
    return product ? acc + product.price * item.quantity : acc;
  }, 0);
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any items to your cart yet.</p>
        <Link to="/menu" className="btn-primary">Browse Menu</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      
      <div className="cart-content">
        <div className="cart-items">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => {
                const product = products.find(p => p.id === item.foodItemId);
                if (!product) return null;
                return (
                  <tr key={item.id}>
                    <td>
                      <div className="product-info">
                        <span className="product-name">{product.name}</span>
                        <span className="product-category">{product.category}</span>
                      </div>
                    </td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>
                      <div className="quantity-controls">
                        <button 
                          onClick={() => updateQuantity(item.foodItemId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => {
                            if (item.quantity >= product.stockQuantity) {
                              alert("Maximum stock limit reached for this item");
                              return;
                            }
                            updateQuantity(item.foodItemId, item.quantity + 1);
                          }}
                          disabled={item.quantity >= product.stockQuantity}
                        >
                          +
                        </button>
                      </div>
                      {item.quantity >= product.stockQuantity && (
                        <div style={{ color: '#E63946', fontSize: '11px', marginTop: '5px', textAlign: 'center' }}>
                          Max limit reached
                        </div>
                      )}
                    </td>
                    <td>${(product.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button 
                        className="btn-remove"
                        onClick={() => removeFromCart(item.foodItemId)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          <div className="cart-actions">
            <Link to="/menu" className="btn-secondary">Continue Shopping</Link>
          </div>
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Tax (5%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <button 
            className="btn-primary full-width"
            onClick={() => navigate('/order')}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
