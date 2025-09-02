import AddDepartment from "./AddDepartment";
import Base from "./Base";
import styles from './Department.module.css';
import { useState, useEffect } from "react";
import api from "./api"; 

export default function Department() {
  const [showAddDepartment, setShowAddDepartment] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  const openAddDepartment = () => setShowAddDepartment(true);
  const closeAddDepartment = () => setShowAddDepartment(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await api.get("/crm/departments/");
        setDepartments(res.data);
      } catch (err) {
        console.error("Error fetching departments:", err);
      }
    };

    fetchDepartments();
  }, []);

  const filteredDepartments = departments.filter((department) =>
    department.name.toLowerCase().includes(searchWord.toLowerCase())
  )

  return (
    <>
      <Base headerTitle={"Departments"}>
        <div className={styles.filterContainer}>
          <div className={styles.buttonTextParent} onClick={openAddDepartment}>
            <div className={styles.buttonText}>Add Department</div>
            <div className={styles.cloudarrowdown}>
              <img
                className={styles.cloudarrowdownChild}
                alt=""
                src="/images/Plus.png"
              />
            </div>
          </div>
        </div>

        <div className={styles.receptionistTable}>
          <div className={styles.tableContainer}>
            <div className={styles.tableHeader}>
              <div className={styles.tableFilters}>
                <div className={styles.searchBox}>
                  <img
                    className={styles.magnifyingglassIcon}
                    alt=""
                    src="/images/Search.png"
                  />
                  <input
                    type="text"
                    placeholder="Search"
                    className={styles.searchInput}
                    value={searchWord}
                    onChange={(e) => setSearchWord(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className={styles.tableBody}>
              <div className={styles.frame}>
                <div className={styles.text}>
                  <div className={styles.name}>Name</div>
                </div>

                <div className={styles.contentParent}>
                  {filteredDepartments.length > 0 ? (
                    filteredDepartments.map((department, index) => (
                      <div
                        key={department.id || index}
                        className={
                          index % 2 === 0
                            ? styles.content
                            : styles.receptionistTableContent
                        }
                      >
                        <div className={styles.sales}>{department.name}</div>
                      </div>
                    ))
                  ) : (
                    <div className={styles.noResults}>No departments Yet</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Base>

      {showAddDepartment && (
        <AddDepartment
          closeAddDepartment={closeAddDepartment}
          onDepartmentAdded={(newDept) =>
            setDepartments([...departments, newDept])
          }
        />
      )}
    </>
  );
}
