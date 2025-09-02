import { useState } from "react";
import axios from "axios";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      setMessage({ text: "Passwords do not match!", type: "error" });
      return;
    }

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/users/register/",
        formData
      );
      console.log(res);
      
      setMessage({ text: "Registered successfully! ", type: "success" });
      navigate("/"); 
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage({ text: "Registration failed", type: "error" });
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerBox}>
        <div className={styles.registerHeader}>
          <h2 className={styles.registerTitle}>Register</h2>
          <p className={styles.registerSubtitle}>
            Create an account using your details.
          </p>
        </div>

        <form className={styles.registerForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className={styles.formInput}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={styles.formInput}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={styles.formInput}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className={styles.formInput}
              required
            />
          </div>

          <button type="submit" className={styles.btnRegister}>
            Register
          </button>
        </form>

        {message && (
          <p
            className={`${styles.message} ${
              message.type === "error" ? styles.error : styles.success
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
}
