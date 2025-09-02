import AddStaff from "./AddStaff";
import Base from "./Base";
import styles from './StaffManagement.module.css';
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import api from "./api";

export default function StaffManagement() {
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [staffs, setStaffs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const openAddStaff = () => setShowAddStaff(true);
  const closeAddStaff = () => setShowAddStaff(false);

  const fetchStaffs = async () => {
    try {
      const res = await api.get("crm/staffs/", {
        params: {
          search: searchText,
          start_date: startDate,
          end_date: endDate,
        },
      });
      setStaffs(res.data);
    } catch (err) {
      console.error("Error fetching staff:", err);
    }
  };

  useEffect(() => {
    fetchStaffs();
  }, []);

  const columns = [
    { key: "username", label: "Username", render: s => s.email.split("@")[0] },
    { key: "name", label: "Name" },
    { key: "manager_name", label: "Manager" },
    { key: "skills", label: "Skill" },
    { key: "phone", label: "Phone" },
    { key: "created_at", label: "Joined On", render: s => s.created_at.split("T")[0] },
    { key: "email", label: "Mail" },
    { key: "status", label: "Status", render: s => s.is_active ? "Active" : "Inactive" },
  ];

  return (
    <>
      <Base headerTitle={"Staff Management"}>
        <div className={styles.filterContainer}>
          <div className={styles.buttonTextParent} onClick={openAddStaff}>
            <div className={styles.buttonText}>Add Staff</div>
            <div className={styles.cloudarrowdown}>
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
                        <div className={styles.label}>From</div>
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
                        <div className={styles.label}>To</div>
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
                  <div className={styles.applyButtonContainer} onClick={fetchStaffs} role="button">
                    <div className={styles.applyButton}>Apply</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.tableBody}>
              {columns.map((col, colIndex) => (
                <div key={colIndex} className={styles[`frame${colIndex}`] || styles.frame}>
                  <div className={styles.text}>
                    <div className={styles.username}>{col.label}</div>
                  </div>
                  {staffs.map((staff, rowIndex) => (
                    <div
                      key={staff.id || rowIndex}
                      className={rowIndex % 2 === 0 ? styles.receptionistTableContent : styles.content}
                    >
                      <div className={styles.nataliCraig}>
                        {col.render ? col.render(staff) : staff[col.key]}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Base>

      {showAddStaff && (
        <AddStaff
          closeAddStaff={closeAddStaff}
          onStaffAdded={(newStaff) => setStaffs([...staffs, newStaff])}
        />
      )}
    </>
  );
}
