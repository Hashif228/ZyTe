import styles from './Base.module.css';
import Header from './Header';
import Sidebar from "./Sidebar";


export default function Base({children,headerTitle}){
    return(
    		<div className={styles.mainFrame}>
      			<div className={styles.menu} >
					<Sidebar/>
        		    <div className={styles.mainContent}>
                        <Header title={headerTitle}/>
                        {children}
                    </div>
                </div>

            </div>      
    )
}