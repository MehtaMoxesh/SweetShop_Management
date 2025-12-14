import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("token");
  const { user } = useContext(AuthContext);
  if (!token) return <Navigate to="/login" />;
  if (adminOnly && user?.role !== "admin") return <Navigate to="/" />;
  return children;
};

export default ProtectedRoute;
