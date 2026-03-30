import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <div className="hero-banner" style={{ backgroundColor: '#E63946', color: 'white', padding: '4rem 2rem', textAlign: 'center', borderRadius: '8px', marginBottom: '2rem' }}>
        <h1>Order Pizza, Drinks &amp; Breads — Fast &amp; Fresh</h1>
        <p>Your favorite meals delivered right to your door.</p>
      </div>
      
      <h2 className="text-center">Our Categories</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
        
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          <div style={{ height: '150px', marginBottom: '15px', overflow: 'hidden' }}>
            <img src="https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=400&q=80" alt="Pizza" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
          </div>
          <h3>Pizza</h3>
          <Link to="/menu?category=Pizza" className="btn">Browse</Link>
        </div>
        
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          <div style={{ height: '150px', marginBottom: '15px', overflow: 'hidden' }}>
            <img src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80" alt="Cold Drinks" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
          </div>
          <h3>Cold Drinks</h3>
          <Link to="/menu?category=Cold Drinks" className="btn">Browse</Link>
        </div>
        
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          <div style={{ height: '150px', marginBottom: '15px', overflow: 'hidden' }}>
            <img src="https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=400&q=80" alt="Breads" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
          </div>
          <h3>Breads</h3>
          <Link to="/menu?category=Breads" className="btn">Browse</Link>
        </div>
        
      </div>
    </div>
  );
}

export default Home;
