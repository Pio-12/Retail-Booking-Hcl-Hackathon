import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../styles/Navbar.css';

function Navbar() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // Calculate total items in cart for the badge
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    alert('You have logged out successfully.');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">QuickBite</Link>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li>
          <Link to="/cart" className="cart-link" style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
            Cart
            {totalItems > 0 && (
              <span className="cart-badge" style={{
                backgroundColor: 'white', color: 'var(--primary-color)', 
                borderRadius: '50%', padding: '2px 6px', fontSize: '0.75rem', 
                fontWeight: 'bold', marginLeft: '5px'
              }}>{totalItems}</span>
            )}
          </Link>
        </li>
        {!isLoggedIn ? (
          <li><Link to="/login" className="btn-login" style={{backgroundColor: 'transparent', border: '1px solid white', color: 'white', padding: '5px 15px', borderRadius: '4px'}}>Login</Link></li>
        ) : (
          <li><button onClick={handleLogout} className="btn-login" style={{backgroundColor: 'white', color: 'var(--primary-color)', border: 'none', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'}}>Logout</button></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
