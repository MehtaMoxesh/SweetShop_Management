import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getCart } from "../api/cartApi";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const load = async () => {
      if (!user) return setCount(0);
      try {
        const res = await getCart();
        setCount(res.data.items.length || 0);
      } catch (err) {
        setCount(0);
      }
    };
    load();
  }, [user]);

  useEffect(() => {
    const handler = async () => {
      if (!user) return setCount(0);
      try {
        const res = await getCart();
        setCount(res.data.items.length || 0);
      } catch (err) {
        setCount(0);
      }
    };
    window.addEventListener('cart:updated', handler);
    window.addEventListener('sweets:updated', handler); // refresh cart count if inventory changes
    return () => {
      window.removeEventListener('cart:updated', handler);
      window.removeEventListener('sweets:updated', handler);
    };
  }, [user]);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="logo">🍬 Sweet Shop</h2>

        {user && location.pathname !== '/login' && (
          <ul className="nav-links nav-left-links">
            <li>
              <NavLink to="/" className={({isActive}) => isActive ? 'active' : ''}>Dashboard</NavLink>
            </li>
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>

      <div className="nav-right">
        <ul className="nav-links nav-right-links">
          {user && location.pathname !== '/login' ? (
            <>
              {user.role === "admin" && (
                <li>
                  <Link to="/admin">Admin</Link>
                </li>
              )}
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>

              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
