import styles from './Sidebar.module.css';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UserCog, UserCheck, Building2 } from "lucide-react";

function Sidebar() {
  const menuItems = [
    { to: "/dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { to: "/managers", icon: <UserCog size={18} />, label: "Managers" },
    { to: "/staff-management", icon: <UserCheck size={18} />, label: "Staff Management" },
    { to: "/customers", icon: <Users size={18} />, label: "Customers" },
    { to: "/department", icon: <Building2 size={18} />, label: "Department" },
  ];

  return (
    <div className={styles.dashboardScreen1_menu}>
      <div className={styles.logo}>
        <img className={styles.logoIcon} alt="" src="/images/Logo.png" />
      </div>

      <div className={styles.menuItems}>
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              isActive ? `${styles.active} ${styles.menuOptions}` : styles.menuOptions
            }
          >
            <div className={styles.menuOptionsInner}>
              <div className={styles.menuIconParent}>
                <div className={styles.menuIcon}>{item.icon}</div>
                <div className={styles.labelDemo}>{item.label}</div>
                <div className={styles.frameChild} />
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
