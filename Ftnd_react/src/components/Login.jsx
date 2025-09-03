import { useState, useEffect } from "react";
import api from "./api"; 
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      try {
        const res = await api.get("users/verify-token/");
        if (res.data.valid) {
          navigate("/dashboard");
        } else {
          localStorage.clear();
        }
      } catch (err) {
        console.error("Token verification failed:", err);
        localStorage.clear();
      }
    };
    verifyToken();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    try {
      const response = await api.post("users/login/", { username, password });

      if (response.data.access) {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("username", response.data.username);

        setMessage({ text: "Login successful! ", type: "success" });
        navigate("/dashboard");
      } else {
        setMessage({ text: "Login failed ", type: "error" });
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setMessage({
        text: error.response?.data?.error || "Login failed.",
        type: "error",
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h2 className="login-title">Log In</h2>
          <p className="login-subtitle">
            Log In using your username and password.
          </p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="btn-login">
            Log In
          </button>
        </form>

        <div className="register">
          <div className="neww">New?</div>
          <Link to="/register" className="reg">
            Register Here
          </Link>
        </div>

        {message.text && (
          <p
            style={{
              marginTop: "10px",
              color: message.type === "error" ? "red" : "green",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
}
