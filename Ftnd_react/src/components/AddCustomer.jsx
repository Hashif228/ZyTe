import { useState } from 'react';
import styles from './AddCustomer.module.css';
import api from './api';

export default function AddCustomer({ closeAddCustomer, onCustomerAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    picture: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'picture') {
      setFormData({ ...formData, picture: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

 const handleSubmit = async () => {
  if (!formData.name || !formData.email || !formData.phone || !formData.gender) {
    alert("Please fill all required fields.");
    return;
  }

  const data = new FormData();
  Object.keys(formData).forEach((key) => {
    if (formData[key]) data.append(key, formData[key]);
  });

  try {
    const res = await api.post(
      "crm/customerss/",  
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    alert("Customer added: " + res.data.name);

    if (onCustomerAdded) onCustomerAdded(res.data);
    closeAddCustomer();

  } catch (err) {
    console.error("API error:", err.response?.data || err.message);
    alert("Error adding customer: " + JSON.stringify(err.response?.data || err.message));
  }
};
  return (
    <div className={styles.overlay}>
      <div className={styles.dashboardScreen05}>
        <div className={styles.text}>
          <div className={styles.title}>Add Customer</div>
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
                className={styles.inputField3}
                placeholder="Full Name"
              />
            </div>

            <div className={styles.inputField}>
              <div className={styles.label}>Upload Profile Picture</div>
              <input
                type="file"
                name="picture"
                onChange={handleChange}
                className={styles.inputField4}
                accept="image/*"
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.inputField}>
              <div className={styles.label}>Gender</div>
              <select
  name="gender"
  value={formData.gender}
  onChange={handleChange}
  className={styles.inputField5}
>
  <option value="" disabled>
    Select
  </option>
  <option value="male">Male</option>
  <option value="female">Female</option>
</select>
            </div>

            <div className={styles.inputField}>
              <div className={styles.label}>Date of Birth</div>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className={styles.inputField3}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.inputField10}>
              <div className={styles.label}>Phone</div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={styles.inputField3}
                placeholder="Phone"
              />
            </div>

            <div className={styles.inputField10}>
              <div className={styles.label}>Mail</div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.inputField3}
                placeholder="Email"
              />
            </div>
          </div>

    

<div className={styles.buttonContainer}>
<div className={styles.buttonTextWrapper} onClick={closeAddCustomer}>
<div className={styles.buttonText}>Cancel</div>
</div>
<div className={styles.buttonTextContainer} role='button' onClick={handleSubmit} >
<div className={styles.buttonText}>Submit</div>
</div>
</div>



        </div>
      </div>
    </div>
  );
}
