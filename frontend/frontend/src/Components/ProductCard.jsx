import React from 'react';

function ProductCard({ product, cartQuantity, onAddToCart }) {
  const isOutOfStock = product.stockQuantity === 0;
  const isMaxReached = !isOutOfStock && cartQuantity >= product.stockQuantity;
  const isLowStock = !isOutOfStock && product.stockQuantity <= 3;
  const isInStock = !isOutOfStock && product.stockQuantity > 3;

  return (
    <div className="product-card" style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', textAlign: 'center', background: 'white' }}>
      
      {isOutOfStock && <span className="badge-out">Out of stock</span>}
      {isLowStock && <span className="badge-low">Only {product.stockQuantity} left!</span>}
      {isInStock && <span className="badge-in">In stock</span>}

      <div style={{ height: '150px', marginBottom: '15px', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '4px', backgroundColor: '#f4f4f4' }}>
        {product.image ? (
          <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span>{product.name} Image</span>
        )}
      </div>
      
      <h3>{product.name}</h3>
      <p style={{ color: '#E63946', fontWeight: 'bold', margin: '10px 0' }}>${product.price.toFixed(2)}</p>
      
      {isOutOfStock ? (
        <button className="btn" disabled>Out of Stock</button>
      ) : isMaxReached ? (
        <>
          <button className="btn" disabled>Max limit reached</button>
          <div style={{ color: '#E63946', fontSize: '12px', marginTop: '5px' }}>Max {product.stockQuantity} items allowed</div>
        </>
      ) : (
        <button className="btn" onClick={() => onAddToCart(product)}>Add to Cart</button>
      )}
    </div>
  );
}

export default ProductCard;
