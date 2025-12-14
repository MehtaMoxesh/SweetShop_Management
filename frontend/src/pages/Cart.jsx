import { useEffect, useState, useContext } from 'react';
import { getCart, updateCartItem, removeCartItem, checkoutCart } from '../api/cartApi';
import { AuthContext } from '../context/AuthContext';

const Cart = () => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const [editQuantities, setEditQuantities] = useState({});
  const [removingId, setRemovingId] = useState(null);
  const { user } = useContext(AuthContext);

  const loadCart = async () => {
    try {
      const res = await getCart();
      setCart(res.data);
      // initialize local edit quantities map
      const map = {};
      (res.data.items || []).forEach((it) => { map[it._id] = it.quantity; });
      setEditQuantities(map);
      // let other components know cart changed (updates navbar count etc.)
      window.dispatchEvent(new Event('cart:updated'));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) loadCart();
  }, [user]);

  const handleQtyChange = async (itemId, qty) => {
    // Prevent zero or negative quantities via input; use Remove button to delete
    if (qty <= 0) return;
    try {
      // avoid unnecessary API call
      const existing = cart.items.find((it) => it._id === itemId);
      if (existing && existing.quantity === qty) return;
      const res = await updateCartItem(itemId, qty);
      setCart(res.data);
      window.dispatchEvent(new Event('cart:updated'));
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message;
      if (msg) alert(msg);
      if (msg && msg.toLowerCase().includes('no longer')) {
        loadCart();
      }
    }
  };

  const handleRemove = async (itemId) => {
    if (!window.confirm('Remove this item from your cart?')) return;
    try {
      setRemovingId(itemId);
      console.log('Removing item', itemId);
      const res = await removeCartItem(itemId);
      // Use server response to update local state so total reflects new cart immediately
      if (res?.data) {
        setCart(res.data);
        const map = {};
        (res.data.items || []).forEach((it) => { map[it._id] = it.quantity; });
        setEditQuantities(map);
      } else {
        await loadCart();
      }
      window.dispatchEvent(new Event('cart:updated'));
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message;
      if (msg) alert(msg);
      if (msg && msg.toLowerCase().includes('no longer')) {
        loadCart();
      }
    } finally {
      setRemovingId(null);
    }
  };

  const handleCheckout = async () => {
    if (!window.confirm('Proceed to checkout?')) return;
    setLoading(true);
    try {
      const res = await checkoutCart();
      alert(res.data.message || 'Order placed');
      setCart({ items: [] });
      window.dispatchEvent(new Event('cart:updated'));
      window.dispatchEvent(new Event('sweets:updated'));
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  const total = cart.items.reduce((sum, it) => sum + ((it.sweet?.price || 0) * it.quantity), 0);

  return (
    <div className="cart-page">
      {/* <h2>Your Cart</h2> */}
      {cart.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.items.map((it) => (
            <div key={it._id} className="cart-item">
              <strong>{it.sweet.name}</strong>
              <p>Price: ₹{it.sweet.price}</p>
              <p>Stock: {it.sweet.quantity}</p>
              <div className="qty-controls">
                <button onClick={() => {
                  const newQty = Math.max(1, (editQuantities[it._id] ?? it.quantity) - 1);
                  setEditQuantities((s)=>({...s,[it._id]: newQty}));
                  handleQtyChange(it._id, newQty);
                }}>-</button>
                <input type="number" min="1" max={it.sweet.quantity} value={editQuantities[it._id] ?? it.quantity} onChange={(e) => {
                  const v = Math.max(1, Math.min(it.sweet.quantity, Number(e.target.value) || 1));
                  setEditQuantities((s)=>({...s,[it._id]: v}));
                  handleQtyChange(it._id, v);
                }} />
                <button onClick={() => {
                  const newQty = Math.min(it.sweet.quantity, (editQuantities[it._id] ?? it.quantity) + 1);
                  setEditQuantities((s)=>({...s,[it._id]: newQty}));
                  handleQtyChange(it._id, newQty);
                }}>+</button>
              </div>
              <button className="btn btn-danger remove-btn" disabled={removingId === it._id} onClick={() => handleRemove(it._id)}>{removingId === it._id ? 'Removing...' : 'Remove'}</button>
            </div>
          ))}

          <div className="cart-summary">
            <h3>Total: ₹{total}</h3>
            <button className="btn" disabled={loading} onClick={handleCheckout}>{loading ? 'Processing...' : 'Checkout'}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
