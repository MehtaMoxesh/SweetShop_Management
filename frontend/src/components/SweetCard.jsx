import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const SweetCard = ({ sweet, isAdmin, onDelete, onAddToCart }) => {
  const [qty, setQty] = useState(0);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  // ensure qty stays within stock and >= 0
  const setQtySafe = (v) => setQty(Math.max(0, Math.min(sweet.quantity, Number(v) || 0)));
  return (
    <div className="card">
      <h3>{sweet.name}</h3>
      <p>Category: {sweet.category}</p>
      <p>Price: ₹{sweet.price}</p>
      <p>Stock: {sweet.quantity}</p>

      {!isAdmin && (
        <div className="add-to-cart-controls">
          <button onClick={() => setQtySafe(qty - 1)} disabled={qty <= 1}>-</button>
          <input className="qty-input" min="1" max={sweet.quantity} value={qty} onChange={(e) => setQtySafe(e.target.value)} />
          <button onClick={() => setQtySafe(qty + 1)} disabled={qty >= sweet.quantity}>+</button>
          {user ? (
            <div className="action-buttons">
                <button className="btn" onClick={() => onAddToCart(sweet._id, qty).then(()=>setQty(0))} disabled={sweet.quantity === 0 || qty <= 0}>
                  Add to Cart
                </button>
                <button className="btn btn-ghost show-cart-btn" onClick={() => navigate('/cart')}>
                  Show Cart
                </button>
              </div>
          ) : (
            <button onClick={() => navigate('/login')}>Login to add</button>
          )}
        </div>
      )}

      {isAdmin && (
        <button className="btn btn-danger" onClick={() => onDelete(sweet._id)} aria-label={`Delete ${sweet.name}`}>
          Delete
        </button>
      )}
    </div>
  );
};

export default SweetCard;
