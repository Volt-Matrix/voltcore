import React, { useState, useEffect } from "react";
import "./AssetListTab.css";
import axios from "axios";
import { getCsrfToken } from "../../context/AuthContext/AuthContext";

const statusClass = (status) => {
  switch (status) {
    case "Available":
      return "status available";
    case "Assigned":
    case "Unavailable":
      return "status assigned";
    case "In Repair":
      return "status repair";
    case "Retired":
      return "status retired";
    case "Lost":
      return "status lost";
    default:
      return "status";
  }
};

const AssetListTab = ({ assetList = [], selectedCategory = "All", selectedAssetId = null, onAssetsUpdated }) => {
  const [assets, setAssets] = useState(assetList);
  const [employees, setEmployees] = useState([]);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeSearchTerm, setEmployeeSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const rowsPerPage = 10;

  useEffect(() => {
    const fetchAssets = async () => {
      if (!selectedAssetId) {
        console.warn("❗ selectedAssetId is null – skipping fetch");
        return;
      }

      try {
        const csrf = await getCsrfToken();
        const res = await axios.get(`http://localhost:8000/api/asset-list/?asset=${selectedAssetId}`, {
          headers: { "X-CSRFToken": csrf },
          withCredentials: true,
        });
        setAssets(res.data);
      } catch (err) {
        console.error("Error fetching assets:", err);
      }
    };

    fetchAssets();
  }, [selectedAssetId]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const csrf = await getCsrfToken();
        const res = await axios.get("http://localhost:8000/api/employees/", {
          headers: { "X-CSRFToken": csrf },
          withCredentials: true,
        });
        setEmployees(res.data);
      } catch (err) {
        console.error("Failed to load employees", err);
      }
    };

    fetchEmployees();
  }, []);

  const filteredAssets = assets.filter((a) => {
    const matchesCategory = selectedCategory === "All" || a.assetName === selectedCategory;
    const matchesStatus = statusFilter === "All" || a.status === statusFilter;
    const matchesSearch =
      a.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.assetId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.assignedTo?.full_name?.toLowerCase() || "").includes(searchTerm.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredAssets.length / rowsPerPage);
  const paginatedAssets = filteredAssets.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleDelete = async (id) => {
    if (!window.confirm(`Delete Asset ID: ${id}?`)) return;

    try {
      const csrf = await getCsrfToken();
      await axios.delete(`http://localhost:8000/api/asset-list/${id}/`, {
        headers: { "X-CSRFToken": csrf },
        withCredentials: true,
      });
      setAssets((prev) => prev.filter((a) => a.id !== id));
      setSelectedAssets((prev) => prev.filter((a) => a !== id));
    } catch (err) {
      console.error("Error deleting asset:", err);
    }
  };

  const handleEdit = (id) => {
    alert(`Edit Asset ID: ${id}`);
  };

  const handleSelect = (id) => {
    setSelectedAssets((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedAssets(paginatedAssets.map((a) => a.id));
    } else {
      setSelectedAssets([]);
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm("Delete selected assets?")) return;
    try {
      const csrf = await getCsrfToken();
      await Promise.all(
        selectedAssets.map((id) =>
          axios.delete(`http://localhost:8000/api/asset-list/${id}/`, {
            headers: { "X-CSRFToken": csrf },
            withCredentials: true,
          })
        )
      );
      setAssets((prev) => prev.filter((a) => !selectedAssets.includes(a.id)));
      setSelectedAssets([]);
    } catch (err) {
      console.error("Bulk delete failed:", err);
    }
  };

  const handleBulkAssign = () => {
    setShowAssignModal(true);
  };

  const confirmAssign = async () => {
    if (!selectedEmployee) return;
    try {
      const csrf = await getCsrfToken();
      await Promise.all(
        selectedAssets.map((assetId) => {
          const asset = assets.find((a) => a.id === assetId);
          if (!asset || asset.status !== "Available") return null;
          return axios.patch(
            `http://localhost:8000/api/asset-list/${asset.id}/`,
            {
              status: "Assigned",
              assignedToId: selectedEmployee,
              assignedDate: new Date().toISOString().split("T")[0],
            },
            {
              headers: { "X-CSRFToken": csrf },
              withCredentials: true,
            }
          );
        })
      );

      const res = await axios.get(`http://localhost:8000/api/asset-list/?asset=${selectedAssetId}`, {
        headers: { "X-CSRFToken": csrf },
        withCredentials: true,
      });
      setAssets(res.data);
      setSelectedAssets([]);
      setSelectedEmployee(null);
      setShowAssignModal(false);
      if (typeof onAssetsUpdated === "function") {
        onAssetsUpdated();
      }
    } catch (error) {
      console.error("Failed to assign assets:", error);
    }
  };

  const handleBulkChangeStatus = (newStatus) => {
    setAssets((prev) =>
      prev.map((a) => (selectedAssets.includes(a.id) ? { ...a, status: newStatus } : a))
    );
    setSelectedAssets([]);
  };

  return (
    <div className="asset-list-tab">
      <div className="card">
        <div className="table-header">
          <h3>{selectedCategory !== "All" && ` - ${selectedCategory}`}</h3>
          <div className="top-controls">
            <input
              type="text"
              placeholder="🔍 Search by name or ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Available">Available</option>
              <option value="Assigned">Assigned</option>
              <option value="In Repair">In Repair</option>
              <option value="Retired">Retired</option>
              <option value="Lost">Lost</option>
            </select>
          </div>
        </div>

        {selectedAssets.length > 0 && (
          <div className="bulk-actions">
            <button onClick={handleBulkDelete}>🗑️ Delete</button>
            <button onClick={handleBulkAssign}>📤 Assign</button>
            <button onClick={() => handleBulkChangeStatus("Available")}>✅ Available</button>
            <button onClick={() => handleBulkChangeStatus("In Repair")}>🛠️ In Repair</button>
          </div>
        )}

        <table className="table-style1">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={
                    paginatedAssets.length > 0 && selectedAssets.length === paginatedAssets.length
                  }
                  onChange={handleSelectAll}
                />
              </th>
              <th>Asset Name</th>
              <th>Asset ID</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Assigned Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedAssets.map((asset) => (
              <tr key={asset.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedAssets.includes(asset.id)}
                    onChange={() => handleSelect(asset.id)}
                  />
                </td>
                <td>{asset.assetName}</td>
                <td>{asset.assetId}</td>
                <td>
                  <span className={statusClass(asset.status)}>{asset.status}</span>
                </td>
                <td>{asset.assignedTo?.full_name || "N/A"}</td>
                <td>{asset.assignedDate}</td>
                <td>
                  <button title="Edit" onClick={() => handleEdit(asset.id)}>
                    ✏️
                  </button>
                  <button title="Delete" onClick={() => handleDelete(asset.id)}>
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div>
            <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
              ◀ Prev
            </button>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
              Next ▶
            </button>
          </div>
        </div>
      </div>

      {showAssignModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Select Employee to Assign</h3>
            <div className="custom-dropdown">
              <input
                type="text"
                placeholder="Search employee..."
                value={employeeSearchTerm}
                onChange={(e) => setEmployeeSearchTerm(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                className="search-input"
              />
              {showDropdown && (
                <ul className="dropdown-list">
                  {employees
                    .filter((emp) =>
                      emp.full_name.toLowerCase().includes(employeeSearchTerm.toLowerCase())
                    )
                    .map((emp) => (
                      <li
                        key={emp.employee_id}
                        onClick={() => {
                          setSelectedEmployee(emp.employee_id);
                          setEmployeeSearchTerm(`${emp.full_name} (${emp.employee_id})`);
                          setShowDropdown(false);
                        }}
                      >
                        {emp.full_name} ({emp.employee_id})
                      </li>
                    ))}
               </ul>
            )}
          </div>

            <div style={{ marginTop: "10px" }}>
              <button className="btn-assign" onClick={confirmAssign}> Assign</button>
              <button className="btn-cancel" onClick={() => setShowAssignModal(false)}> Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetListTab;
