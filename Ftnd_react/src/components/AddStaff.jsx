import { useState, useEffect } from "react";
import styles from "./AddStaff.module.css";
import api from "./api"; 

export default function AddStaff({ closeAddStaff, onStaffAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    skills: "",
    manager: "",
  });

  const [managers, setManagers] = useState([]);

  useEffect(() => {
    api
      .get("crm/managers/") 
      .then((res) => setManagers(res.data))
      .catch((err) => console.error("Error fetching managers:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.skills ||
      !formData.manager
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      const res = await api.post("crm/staffs/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (onStaffAdded) onStaffAdded(res.data);
      closeAddStaff();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(
        "Error adding staff: " +
          JSON.stringify(err.response?.data || err.message)
      );
    }
  };

  return (
    <div className={styles.dashboardScreen05}>
      <div className={styles.text}>
        <div className={styles.title}>Add Staff</div>
      </div>

      <div className={styles.formContainer}>
        <div className={styles.formRow}>
          <div className={styles.inputField}>
            <div className={styles.label}>Full Name</div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className={styles.dashboardScreen05InputField}
            />
          </div>
          <div className={styles.inputField}>
            <div className={styles.label}>Phone</div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className={styles.dashboardScreen05InputField}
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.inputField4}>
            <div className={styles.label}>Mail</div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={styles.dashboardScreen05InputField}
            />
          </div>
          <div className={styles.inputField4}>
            <div className={styles.label}>Skills</div>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Skill"
              className={styles.dashboardScreen05InputField}
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.inputField4}>
            <div className={styles.label}>Manager</div>
            <select name="manager" value={formData.manager} onChange={handleChange}>
              <option value="" disabled>
                Select Manager
              </option>
              {managers.map((manager) => (
                <option key={manager.id} value={manager.id}>
                  {manager.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <div className={styles.buttonTextWrapper} onClick={closeAddStaff}>
            <div className={styles.buttonText}>Cancel</div>
          </div>
          <div className={styles.buttonTextContainer} onClick={handleSubmit}>
            <div className={styles.buttonText}>Submit</div>
          </div>
        </div>
      </div>
    </div>
  );
}
