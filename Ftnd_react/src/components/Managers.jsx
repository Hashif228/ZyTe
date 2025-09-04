import AddManager from "./AddManager";
import Base from "./Base";
import styles from './Managers.module.css';
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import api from "./api"; 

export default function Managers() {
    const toggleStatus = async (id, newStatus) => {
  try {
    await api.patch(`crm/managers/${id}/`, { status: newStatus });
    setManagers(managers.map(m => m.id === id ? { ...m, status: newStatus } : m));
    setFilteredManagers(filteredManagers.map(m => m.id === id ? { ...m, status: newStatus } : m));
  } catch (err) {
    console.error("Error updating manager status:", err);
  }
};

  const [showAddManager, setShowAddManager] = useState(false);
  const [managers, setManagers] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [filteredManagers, setFilteredManagers] = useState([]);

  useEffect(() => {
    api.get("crm/managers/")   
      .then(res => {
        setManagers(res.data);
        setFilteredManagers(res.data); 
      })
      .catch(err => console.error("Error fetching managers:", err));
  }, []);

  const applyFilter = () => {
    const filtered = managers.filter(manager => {
      const matchesSearch =
        manager.name.toLowerCase().includes(searchText.toLowerCase()) ||
        manager.email.toLowerCase().includes(searchText.toLowerCase()) ||
        manager.phone.includes(searchText);

      const createdDate = new Date(manager.created_at.split("T")[0]);
      const afterStart = startDate ? createdDate >= new Date(startDate) : true;
      const beforeEnd = endDate ? createdDate <= new Date(endDate) : true;

      return matchesSearch && afterStart && beforeEnd;
    });

    setFilteredManagers(filtered);
  };

  const openAddManager = () => setShowAddManager(true);
  const closeAddManager = () => setShowAddManager(false);

    return (
        <>
            <Base headerTitle={"Manager"}>
                <div className={styles.filterContainer}>
                    <div className={styles.buttonTextParent} onClick={openAddManager} >
                        <div className={styles.buttonText}>Add Manager</div>
                        <div className={styles.cloudarrowdown}>
                            <img className={styles.cloudarrowdownChild} alt="" src="/images/Plus.png" />
                        </div>
                    </div>
                </div>

                <div className={styles.receptionistTable}>
                    <div className={styles.tableContainer}>
                        <div className={styles.tableHeader}>
                            <div className={styles.tableFilters}>
                                <div className={styles.inputField}>
                                    <div className={styles.searchBox}>
                                        <img className={styles.magnifyingglassIcon} alt="" src="/images/Search.png" />
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            className={styles.searchInput}
                                            value={searchText}
                                            onChange={e => setSearchText(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className={styles.dateFilters}>
                                    <div className={styles.dateRange}>
                                        <div className={styles.dateRangeInputs}>
                                            <div className={styles.startDate}>
                                                <div className={styles.label}>
                                                    <div className={styles.receptionistTableLabel}>From</div>
                                                </div>
                                                <div className={styles.fieldContent}>
                                                    <input
                                                        className={styles.chooseDate}
                                                        type="date"
                                                        value={startDate}
                                                        onChange={e => setStartDate(e.target.value)}
                                                    />
                          <X className={styles.iconFieldCalendar} onClick={() => setStartDate("")}  />
                                                </div>
                                            </div>
                                            <div className={styles.startDate}>
                                                <div className={styles.label}>
                                                    <div className={styles.receptionistTableLabel}>To</div>
                                                </div>
                                                <div className={styles.fieldContent}>
                                                    <input
                                                        className={styles.chooseDate}
                                                        type="date"
                                                        value={endDate}
                                                        onChange={e => setEndDate(e.target.value)}
                                                    />
                          <X className={styles.iconFieldCalendar} onClick={() => setEndDate("")}  />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.applyButtonContainer} onClick={applyFilter}>
                                        <div className={styles.applyButton}>Apply</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.tableBody}>
                            {["Managername", "Name", "Phone", "Department", "Team", "Joined On", "Mail", "Status"].map((col, idx) => (
                                <div key={idx} className={styles[`frame${idx}`]}>
                                    <div className={styles.text}>
                                        <div className={styles.table_header}>{col}</div>
                                    </div>
                                    {filteredManagers.map((manager, index) => (
                                        <div
                                            key={manager.id || index}
                                            className={index % 2 === 0 ? styles.receptionistTableText : styles.text4}
                                        >
                                            {col === "Managername" && <div className={styles.support}>{manager.name}-0{manager.id}</div>}
                                            {col === "Name" && <div className={styles.support}>{manager.name}</div>}
                                            {col === "Phone" && <div className={styles.table_header}>{manager.phone}</div>}
                                            {col === "Department" && <div className={styles.support}>{manager.department_name}</div>}
                                            {col === "Team" && <div className={styles.support}>{manager.team}</div>}
                                            {col === "Joined On" && (
                                                <div className={styles.calendarblankParent}>
                                                    <img className={styles.calendarblankIcon} alt="" src="/images/Calendar.png" />
                                                    <div className={styles.text59}>
                                                        <div className={styles.support}>{manager.created_at.split("T")[0]}</div>
                                                    </div>
                                                </div>
                                            )}
                                            {col === "Mail" && <div className={styles.support}>{manager.email}</div>}
                                                                                            {col === "Status" && (
                                                <label className={styles.switch}>
                                                            <input
                                                            type="checkbox"
                                                            checked={manager.status}
                                                            onChange={() => toggleStatus(manager.id, !manager.status)}
                                                            />

                                                    <span className={styles.slider}></span>
                                                </label>
                                                )}

                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Base>

            {showAddManager && (
                <AddManager
                    closeAddManager={closeAddManager}
                    onManagerAdded={(newManager) => {
                        setManagers([...managers, newManager]);
                        setFilteredManagers([...managers, newManager]);
                    }}
                />
            )}
        </>
    );
}
