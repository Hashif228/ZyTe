
import styles from './Header.module.css';
import { useState,useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Header({title}){
    const [username, setUsername] = useState("");
    const navigate=useNavigate()
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  const handleLogout = () => {
    localStorage.clear(); 
    navigate("/"); 
  };
    return(
                 <div className={styles.header}>
                    <div className={styles.headerContent}>
                        <div className={styles.headerTitle}>
                                <img className={styles.rimenu3LineIcon}  />
                                <div className={styles.pageTitle}>{title}</div>
                        </div>
                        <div className={styles.searchContainer}>
                        <div className={styles.logout} onClick={handleLogout}>logout</div>
                            <div className={styles.searchInput}>
                                <div className={styles.searchInputChild} ></div>
                                <div className={styles.component1}>
                                       <img className={styles.userIcon} alt="" src="/images/UserIcon.png" />
                                        <div className={styles.component1Inner}>
                                            <div className={styles.johnMathewParent}>
                                                <div className={styles.johnMathew}>{(username || "Guest")}</div>
                                                <div className={styles.adminParent}>
                                                    <div className={styles.admin}>Admin</div>
                                                    <img className={styles.caretdownIcon} alt="" src="CaretDown.svg" />
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
    )
}
       