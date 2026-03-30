import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

// Member 1 Pages
import Home from './Pages/Home';
import Menu from './Pages/Menu';
import Login from './Pages/Login';
import Register from './Pages/Register';

// Member 2 Pages
import Cart from './Pages/Cart';
import Order from './Pages/Order';
import Confirmation from './Pages/Confirmation';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Member 1 Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Member 2 Routes */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/order" element={<Order />} />
              <Route path="/confirmation" element={<Confirmation />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
