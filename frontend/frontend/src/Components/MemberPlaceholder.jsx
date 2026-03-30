import React from 'react';
import { Link } from 'react-router-dom';

function MemberPlaceholder({ moduleName }) {
  return (
    <div style={{ padding: '4rem 2rem', textAlign: 'center', maxWidth: '600px', margin: '4rem auto', background: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
      <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🤝</div>
      <h2 style={{ color: '#1D3557', marginBottom: '1rem', fontSize: '2rem' }}>{moduleName} Module</h2>
      
      <div style={{ width: '60px', height: '4px', backgroundColor: '#E63946', margin: '0 auto 1.5rem auto', borderRadius: '2px' }}></div>
      
      <p style={{ color: '#555', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
        This section demonstrates our team's modular frontend architecture. 
        <br/><br/>
        While I engineered the core browsing, authentication, and product listing workflows, <strong>Frontend Member 2</strong> is exclusively responsible for the development and API integration of the <strong>{moduleName}</strong> interface.
      </p>
      
      <div style={{ background: '#F1FAEE', padding: '15px', borderRadius: '8px', marginBottom: '2rem', textAlign: 'left', border: '1px solid #e0e0e0' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#1D3557' }}>Member 2 Deliverables:</h4>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#555' }}>
          <li>Shopping Cart State Management</li>
          <li>Order Checkout Flow</li>
          <li>Payment Confirmation Pages</li>
        </ul>
      </div>

      <Link to="/menu" className="btn">Return to Product Browsing</Link>
    </div>
  );
}

export default MemberPlaceholder;
