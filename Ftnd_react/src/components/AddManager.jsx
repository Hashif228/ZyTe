import { useState, useEffect } from "react";
import api from "./api";
import styles from './AddManager.module.css';

export default function AddManager({ closeAddManager, onManagerAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    department: "", 
    team: ""
  });

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    api.get("crm/departments/") 
      .then(res => setDepartments(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const res = await api.post("crm/managers/", {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        department: formData.department,
        team: formData.team
      });

      if (onManagerAdded) onManagerAdded(res.data);

      alert("Manager added successfully!"); 
      closeAddManager();
    } catch (err) {
      console.error("Error adding manager:", err.response ? err.response.data : err);
      alert("Failed to add manager. Check console for details.");
    }
  };

  return (
    <div className={styles.dashboardScreen05}>
      <div className={styles.text}>
        <div className={styles.title}>Add Manager</div>
      </div>

      <div className={styles.formContainer}>
        <div className={styles.formRow}>
          <div className={styles.inputField}>
            <div className={styles.label}>Full Name</div>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className={styles.dashboardScreen05InputField} />
          </div>

          <div className={styles.inputField}>
            <div className={styles.label}>Phone</div>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className={styles.dashboardScreen05InputField} />
          </div>
        </div>

        <div className={styles.dashboardScreen05FormRow}>
          <div className={styles.inputField4}>
            <div className={styles.label}>Email</div>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className={styles.dashboardScreen05InputField} />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.inputField4}>
            <div className={styles.label}>Department</div>
            <select name="department" value={formData.department} onChange={handleChange} className={styles.dashboardScreen05InputField}>
              <option value="" disabled>Select Department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
          </div>

          <div className={styles.inputField4}>
            <div className={styles.label}>Team</div>
            <input type="text" name="team" value={formData.team} onChange={handleChange} placeholder="Team Name" className={styles.dashboardScreen05InputField} />
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <div className={styles.buttonTextWrapper} onClick={closeAddManager}>
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
