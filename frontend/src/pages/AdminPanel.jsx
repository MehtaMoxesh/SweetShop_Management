import { useState, useEffect } from "react";
import { addSweet, getSweets, deleteSweet } from "../api/sweetsApi";

const AdminPanel = () => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSweet(form);
      alert("Sweet Added");
      // notify others that sweets changed
      window.dispatchEvent(new Event('sweets:updated'));
    } catch (err) {
      alert(err?.response?.data?.message || 'Could not add sweet');
    }
  };

  const [sweets, setSweets] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  const loadSweets = async () => {
    try {
      const res = await getSweets();
      setSweets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadSweets();
    const handler = () => loadSweets();
    window.addEventListener('sweets:updated', handler);
    return () => window.removeEventListener('sweets:updated', handler);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this sweet from the shop?')) return;
    setDeletingId(id);
    try {
      const res = await deleteSweet(id);
      console.log('Delete response', res);
      if (res?.data?.sweets) {
        setSweets(res.data.sweets);
      } else {
        await loadSweets();
      }
      alert('Sweet deleted');
      window.dispatchEvent(new Event('sweets:updated'));
      window.dispatchEvent(new Event('cart:updated'));
    } catch (err) {
      console.error(err?.response || err);
      alert(err?.response?.data?.message || 'Could not delete');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <form className="admin-form" onSubmit={handleSubmit}>
      <h2>Admin Panel</h2>
      <input className="input" placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})}/>
      <input className="input" placeholder="Category" onChange={(e)=>setForm({...form,category:e.target.value})}/>
      <input className="input" placeholder="Price" onChange={(e)=>setForm({...form,price:e.target.value})}/>
      <input className="input" placeholder="Quantity" onChange={(e)=>setForm({...form,quantity:e.target.value})}/>
      <button className="btn">Add Sweet</button>
      </form>

      <section className="admin-list">
        <h3>Shop Inventory</h3>
        <div className="grid">
          {sweets.map((s) => (
            <div key={s._id} className="card">
              <h3>{s.name}</h3>
              <p>Category: {s.category}</p>
              <p>Price: ₹{s.price}</p>
              <p>Stock: {s.quantity}</p>
              <div style={{display:'flex', gap:'0.5rem', marginTop:'0.5rem'}}>
                <button type="button" className="btn btn-danger" disabled={deletingId === s._id} onClick={() => handleDelete(s._id)}>{deletingId === s._id ? 'Deleting...' : 'Delete'}</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;
