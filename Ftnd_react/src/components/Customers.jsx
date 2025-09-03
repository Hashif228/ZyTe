import { useState, useEffect } from "react";
import AddCustomer from "./AddCustomer";
import Base from "./Base";
import styles from "./Customers.module.css";
import { X } from "lucide-react";
import api from "./api";

function Customers() {
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const openAddCustomer = () => setShowAddCustomer(true);
  const closeAddCustomer = () => setShowAddCustomer(false);

  const fetchCustomers = async () => {
    try {
      const res = await api.get("crm/customers", {
        params: { search: searchText, start_date: startDate, end_date: endDate },
      });
      setCustomers(res.data);
    } catch (err) {
      console.error("Error fetching customers:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("access_token");
        window.location.href = "/";
      }
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <>
      <Base headerTitle={"Customers"}>
        <div className={styles.filterContainer}>
          <div className={styles.buttonTextParent} onClick={openAddCustomer}>
            <div className={styles.buttonText}>Add Customer</div>
            <div className={styles.dashboardScreen07_menuIcon}>
              <img className={styles.cloudarrowdownChild} alt="" src="/images/Plus.png" />
            </div>
          </div>
        </div>

        <div className={styles.receptionistTable}>
          <div className={styles.tableContainer}>
            <div className={styles.tableHeader}>
              <div className={styles.tableFilters}>

                <div className={styles.searchBox}>
                  <img className={styles.magnifyingglassIcon} alt="" src="/images/Search.png" />
                  <input
                    type="text"
                    placeholder="Search"
                    className={styles.searchInput}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>

                <div className={styles.dateFilters}>
                  <div className={styles.dateRange}>
                    <div className={styles.dateRangeInputs}>
                      <div className={styles.startDate}>
                        <div className={styles.menu}>
                          <div className={styles.dashboardScreen07_label}>From</div>
                        </div>
                        <div className={styles.fieldContent}>
                          <input
                            className={styles.chooseDate}
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                          />
                          <X className={styles.iconFieldCalendar} onClick={() => setStartDate("")}  />
                        </div>
                      </div>

                      <div className={styles.startDate}>
                        <div className={styles.menu}>
                          <div className={styles.dashboardScreen07_label}>To</div>
                        </div>
                        <div className={styles.fieldContent}>
                          <input
                            className={styles.chooseDate}
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                          />
                          <X className={styles.iconFieldCalendar} onClick={() => setEndDate("")}  />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.applyButtonContainer}>
                    <div className={styles.applyButton} onClick={fetchCustomers}>
                      Apply
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.tableBody}>
              <div className={styles.frame}>
                <div className={styles.text}>
                  <div className={styles.idHeader}>ID</div>
                </div>
                {customers.map((customer, index) => (
                  <div
                    key={customer.id || index}
                    className={index % 2 === 0 ? styles.dashboardScreen07_text : styles.text3}
                  >
                    <div className={styles.idRow1}>CR-{customer.id}</div>
                  </div>
                ))}
              </div>

              <div className={styles.dashboardScreen07_frame}>
                <div className={styles.text8}>
                  <div className={styles.nameHeader}>Name</div>
                </div>
                {customers.map((customer, index) => (
                  <div
                    key={customer.id || index}
                    className={index % 2 === 0 ? styles.content : styles.dashboardScreen07_content}
                  >
                    <div className={styles.icontext}>
                      <div className={styles.iconset}>
                        <img
                          className={styles.female15Icon}
                          alt="Pic"
                          src={customer.picture || "/images/Customers.png"}
                        />
                      </div>
                      <div className={styles.text9}>
                        <div className={styles.idRow1}>{customer.name}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.frame1}>
                <div className={styles.text}>
                  <div className={styles.nameHeader}>Phone</div>
                </div>
                {customers.map((customer, index) => (
                  <div
                    key={customer.id || index}
                    className={index % 2 === 0 ? styles.text3 : styles.dashboardScreen07_text}
                  >
                    <div className={styles.nameHeader}>{customer.phone}</div>
                  </div>
                ))}
              </div>

              <div className={styles.frame2}>
                <div className={styles.text34}>
                  <div className={styles.nameHeader}>Gender</div>
                </div>
                {customers.map((customer, index) => (
                  <div
                    key={customer.id || index}
                    className={index % 2 === 0 ? styles.content7 : styles.content8}
                  >
                    <div className={styles.genders}>
                      <img
                        className={styles.genderfemaleIcon}
                        alt=""
                        src={customer.gender === "Female" ? "GenderFemale.svg" : "GenderMale.svg"}
                      />
                      <div className={styles.female}>{customer.gender}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.frame3}>
                <div className={styles.text35}>
                  <div className={styles.nameHeader}>Added On</div>
                </div>
                {customers.map((customer, index) => (
                  <div
                    key={customer.id || index}
                    className={index % 2 === 0 ? styles.text3 : styles.dashboardScreen07_text}
                  >
                    <div className={styles.addedOnRow1}>
                      <img className={styles.genderfemaleIcon} alt="" src="CalendarBlank.svg" />
                      <div className={styles.text9}>
                        <div className={styles.idRow1}>
                          {customer.created_at?.split("T")[0]}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.frame4}>
                <div className={styles.text35}>
                  <div className={styles.nameHeader}>Mail</div>
                </div>
                {customers.map((customer, index) => (
                  <div
                    key={customer.id || index}
                    className={index % 2 === 0 ? styles.content : styles.dashboardScreen07_content}
                  >
                    <div className={styles.text61}>
                      <div className={styles.idRow1}>{customer.email}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.frame5}>
                <div className={styles.text35}>
                  <div className={styles.nameHeader}>Status</div>
                </div>
                {customers.map((customer, index) => (
                  <div
                    key={customer.id || index}
                    className={index % 2 === 0 ? styles.content23 : styles.dashboardScreen07_content}
                  >
                    <div
                      className={
                        customer.status === "In Progress"
                          ? styles.statusbadge5
                          : customer.status === "Converted"
                          ? styles.dashboardScreen07_statusbadge
                          : styles.statusbadge
                      }
                    >
                      <div className={styles.enterTitle}>{customer.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Base>

      {showAddCustomer && (
        <AddCustomer
          closeAddCustomer={closeAddCustomer}
          onCustomerAdded={(newCustomer) => setCustomers([...customers, newCustomer])}
        />
      )}
    </>
  );
}

export default Customers;
