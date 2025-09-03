import { useEffect, useState } from "react";
import styles from './Dashboard.module.css';
import Base from './Base';
import { Users, UserCog, UserCheck, Building2 } from "lucide-react";
import api from "./api";
export default function Dashboard() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  const [counters, setCounters] = useState({
    totalManagers: "",
    totalStaff: "",
    totalCustomers: "",
    totalDepartments: ""
  });

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countersRes = await api.get("crm/totals/");
        setCounters(countersRes.data);

        const customersRes = await api.get("crm/customers/");
        setCustomers(customersRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Base headerTitle={"Dashboard"}>
      <div className={styles.welcomeBar}>
        <div className={styles.title}>Welcome, {username}!</div>
        <div className={styles.userInfo} />
      </div>

      <div className={styles.contentArea}>
        <div className={styles.summaryCards}>
          <div className={styles.summaryCardRow}>
            <div className={styles.summaryCard}>
              <div className={styles.dashboardCountersParent}>
                <div className={styles.dashboardCounters}>
                  <UserCog size={18} className={styles.managers_icon} />
                </div>
                <div className={styles.frameParent}>
                  <div className={styles.totalPatientsWrapper}>
                    <div className={styles.totalPatients}>Total Managers</div>
                  </div>
                  <div className={styles.wrapper}>
                    <div className={styles.div}>{counters.totalManagers}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.summaryCard}>
              <div className={styles.dashboardCountersParent}>
                <div className={styles.dashboardCounters}>
                  <UserCheck size={18} className={styles.staff_icon}/>
                </div>
                <div className={styles.frameParent}>
                  <div className={styles.totalPatientsWrapper}>
                    <div className={styles.totalPatients}>Total Staffs</div>
                  </div>
                  <div className={styles.wrapper}>
                    <div className={styles.div}>{counters.totalStaff}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.summaryCard}>
              <div className={styles.dashboardCountersParent}>
                <div className={styles.dashboardCounters1}>
                  <Users size={18} className={styles.customers_icon}/>
                </div>
                <div className={styles.frameParent}>
                  <div className={styles.totalPatientsWrapper}>
                    <div className={styles.totalPatients}>Total Customers</div>
                  </div>
                  <div className={styles.wrapper}>
                    <div className={styles.div}>{counters.totalCustomers}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.summaryCard}>
              <div className={styles.dashboardCountersParent}>
                <div className={styles.dashboardCounters1}>
                  <Building2 className={styles.department_icon} size={18} />
                </div>
                <div className={styles.frameParent}>
                  <div className={styles.totalPatientsWrapper}>
                    <div className={styles.totalPatients}>Total Departments</div>
                  </div>
                  <div className={styles.wrapper}>
                    <div className={styles.div}>{counters.totalDepartments}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
<div className={styles.customerSection}>
  <div className={styles.customerSection}>
    <div className={styles.menu}>
      <div className={styles.block}>
        <div className={styles.customerInfo}>
          <div className={styles.customerSection}>
            <div className={styles.dashboardScreen1_text}>
              <div className={styles.customerId}>Customer ID</div>
            </div>

            {customers.map((customer) => (
              <div key={customer.id} className={styles.content}>
                <div className={styles.dashboardScreen1_customerId}>
                  {customer.customer_id || `CS${customer.id}`}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.frame1}>
            <div className={styles.text1}>
              <div className={styles.customerId}>Name</div>
            </div>
            {customers.map((customer) => (
              <div key={customer.id} className={styles.dashboardScreen1_content}>
                <div className={styles.icontext}>
                  <div className={styles.text2}>
                    <div className={styles.text3}>{customer.name}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.frame2}>
            <div className={styles.text1}>
              <div className={styles.customerId}>Phone</div>
            </div>
            {customers.map((customer) => (
              <div key={customer.id} className={styles.dashboardScreen1_content}>
                <div className={styles.icontext}>
                  <div className={styles.text2}>
                    <div className={styles.text3}>{customer.phone}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.frame1}>
            <div className={styles.text1}>
              <div className={styles.customerId}>Email</div>
            </div>
            {customers.map((customer) => (
              <div key={customer.id} className={styles.dashboardScreen1_content}>
                <div className={styles.dashboardScreen1_customerId}>{customer.email}</div>
              </div>
            ))}
          </div>

         <div className={styles.frame4}>
  <div className={styles.text1}>
    <div className={styles.customerStatus}>Status</div>
  </div>
  {customers.map((customer) => (
    <div key={customer.id} className={styles.content}>
      <div
        className={
          customer.status === "New"
            ? styles.statusNew
            : customer.status === "In Progress"
            ? styles.statusInProgress
            : styles.statusConverted
        }
      >
        {customer.status}
      </div>
    </div>
  ))}
</div>

        </div>
      </div>
    </div>
  </div>
</div>


      </div>
    </Base>
  );
}
