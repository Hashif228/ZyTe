import { useState } from "react";
import api from "./api";   
import styles from './AddDepartment.module.css';

export default function AddDepartment({ closeAddDepartment, onDepartmentAdded }) {
  const [departmentName, setDepartmentName] = useState("");

  const handleSubmit = async () => {
    if (!departmentName.trim()) {
      alert("Department name is required");
      return;
    }

    try {
      const res = await api.post("crm/departments/", { name: departmentName });

      onDepartmentAdded(res.data);
      setDepartmentName("");
      closeAddDepartment();
      alert("Department added: " + res.data.name);

    } catch (err) {
      console.error("API error:", err.response?.data || err.message);
      const firstError = err.response?.data
        ? Object.values(err.response.data)[0]
        : "Unknown error";
      alert(Array.isArray(firstError) ? firstError[0] : JSON.stringify(firstError));
    }
  };
  return (
    <div className={styles.dashboardScreen05}>
      <div className={styles.text}>
        <div className={styles.title}>Add Department</div>
      </div>

      <div className={styles.formContainer}>
        <div className={styles.formRow}>
          <div className={styles.inputField}>
            <div className={styles.inputLabel}>Department Name</div>
            <input
              type="text"
              className={styles.dashboardScreen05InputField}
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              placeholder="Enter Department Name"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>
        </div>

       <div className={styles.buttonContainer}>
  <div className={styles.cancelButton} onClick={closeAddDepartment}>
    Cancel
  </div>
  <div
    className={`${styles.submitButton} ${!departmentName.trim() ? styles.disabled : ""}`}
    onClick={handleSubmit}
  >
    Submit
  </div>
</div>

      </div>
    </div>
  );
}
