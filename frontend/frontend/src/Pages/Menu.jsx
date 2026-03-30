import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';
import { CartContext } from '../context/CartContext';

function Menu() {
  const [filter, setFilter] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8082/menu');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error('Failed to fetch menu items', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryQuery = params.get('category');
    if (categoryQuery && products.map(p => p.category).includes(categoryQuery)) {
      setFilter(categoryQuery);
    } else {
      setFilter('All');
    }
  }, [location.search, products]);

  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  const { cart, addToCart } = useContext(CartContext);

  if (loading) {
    return <div className="text-center" style={{ padding: '40px' }}>Loading menu...</div>;
  }

  const handleAddToCart = async (product) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      alert('Please login first to add items to the cart!');
      navigate('/login');
      return;
    }

    // Rely securely on Context instead of mutating localStorage directly
    await addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  const setCategoryFilter = (category) => {
    setFilter(category);
    if (category === 'All') {
      navigate('/menu', { replace: true });
    } else {
      navigate(`/menu?category=${category}`, { replace: true });
    }
  }

  return (
    <div>
      <h2 className="text-center">Our Menu</h2>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {['All', ...new Set(products.map(p => p.category))].map(category => (
          <button 
            key={category} 
            className="btn" 
            style={{ backgroundColor: filter === category ? '#1D3557' : '#E63946' }}
            onClick={() => setCategoryFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {filteredProducts.map(product => (
           <ProductCard 
             key={product.id} 
             product={{ ...product, image: product.imageUrl }} 
             cartQuantity={cart.find(c => c.foodItemId === product.id)?.quantity || 0}
             onAddToCart={handleAddToCart} 
           />
        ))}
      </div>
    </div>
  );
}

export default Menu;
