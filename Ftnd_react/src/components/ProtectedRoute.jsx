
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    // No token → redirect to login
    return <Navigate to="/" replace />;
  }

  return children;
}
