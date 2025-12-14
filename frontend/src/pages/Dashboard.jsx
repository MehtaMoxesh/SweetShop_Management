import { useEffect, useState, useContext, useRef } from "react";
import { getSweets, searchSweets } from "../api/sweetsApi";
import { addToCart } from "../api/cartApi";
import SweetCard from "../components/SweetCard";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const [sweets, setSweets] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);
  const { user } = useContext(AuthContext);

  const loadSweets = async (opts = {}) => {
    setLoading(true);
    try {
      const { q, category: cat } = opts;
      const res = (q || cat) ? await searchSweets({ q, category: cat }) : await getSweets();
      setSweets(res.data);
      // derive categories from returned sweets if not set
      const cats = Array.from(new Set((res.data || []).map(s => s.category).filter(Boolean)));
      setCategories(cats);
    } catch (err) {
      console.error('Load sweets failed', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSweets();
  }, []);

  useEffect(() => {
    const handler = () => loadSweets({ q: query, category });
    window.addEventListener('sweets:updated', handler);
    return () => window.removeEventListener('sweets:updated', handler);
  }, []);

  // debounce search / filter
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      loadSweets({ q: query, category });
    }, 380);
    return () => clearTimeout(debounceRef.current);
  }, [query, category]);

  const handleClear = () => {
    setQuery("");
    setCategory("");
    loadSweets({ q: "", category: "" });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      loadSweets({ q: query, category });
    }
  };

  const handleAddToCart = async (id, qty = 1) => {
    try {
      await addToCart(id, qty);
      alert('Added to cart');
      // Notify navbar to refresh the count
      window.dispatchEvent(new Event('cart:updated'));
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Could not add to cart');
    }
  };

  return (
    <div>
      <div className="dashboard-controls rows" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div className="search-wrapper">
            <svg className="search-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden>
              <path fill="currentColor" d="M10 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm8.707 14.293-4.386-4.386A7.5 7.5 0 1 0 20 18.5l-1.293-1.293z"></path>
            </svg>
            <input className="search-bar" placeholder="Search sweets..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown} />
            {query && <button className="clear-btn" onClick={handleClear} aria-label="Clear search">✕</button>}
          </div>

          <select className="filter-select" value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category">
            <option value="">All Categories</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div style={{ textAlign: 'right' }}>
          {loading ? <span className="badge">Searching...</span> : <span className="badge">{sweets.length} items</span>}
        </div>
      </div>

      {/* Category chips */}
      {categories.length > 0 && (
        <div className="dashboard-controls" style={{ marginBottom: '0.75rem' }}>
          <div className="filter-chips">
            <button className={`filter-chip ${category === '' ? 'active' : ''}`} onClick={() => setCategory('')}>All</button>
            {categories.map((c) => (
              <button key={c} className={`filter-chip ${category === c ? 'active' : ''}`} onClick={() => setCategory(category === c ? '' : c)}>{c}</button>
            ))}
          </div>
        </div>
      )}

      <div className="grid">
        {sweets.map((s) => (
          <SweetCard
            key={s._id}
            sweet={s}
            onAddToCart={handleAddToCart}
            isAdmin={user?.role === "admin"}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
