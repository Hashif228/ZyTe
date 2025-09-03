
import styles from './Header.module.css';
import { useState,useEffect } from 'react';

export default function Header({title}){
    const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
    return(
                 <div className={styles.header}>
                    <div className={styles.headerContent}>
                        <div className={styles.headerTitle}>
                                <img className={styles.rimenu3LineIcon}  />
                                <div className={styles.pageTitle}>{title}</div>
                        </div>
                        <div className={styles.searchContainer}>
                        <div className='styles.logout'>logout</div>
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
       