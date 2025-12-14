import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({ name:"", email:"", password:"" });

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await registerUser(form);
      // auto-login the user with returned token + user
      login(res.data);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input className="input" placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})}/>
      <input className="input" placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
      <input className="input" type="password" placeholder="Password" onChange={(e)=>setForm({...form,password:e.target.value})}/>
      <button className="btn" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
    </form>
  );
};

export default Register;
