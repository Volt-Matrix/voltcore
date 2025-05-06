import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import assetsData from "./AssetData";
import "./MyAssets.css";

function Assets() {
  const [assets, setAssets] = useState(assetsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAsset, setNewAsset] = useState({
    assetName: "",
    assetType: "",
    serialNumber: "",
    assignedTo: "",
    status: "Active",
    purchaseDate: "",
    notes: ""
  });

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || asset.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleAddAsset = (e) => {
    e.preventDefault();
    setAssets([...assets, newAsset]);
    setShowAddModal(false);
    toast.success("New Asset Added Successfully!");

    setNewAsset({
      assetName: "",
      assetType: "",
      serialNumber: "",
      assignedTo: "",
      status: "Active",
      purchaseDate: "",
      notes: ""
    });
  };

  return (
    <div className="assets-container">
      <h2>Company Assets Management</h2>

      {/* Total Assets Count */}
      <div className="assets-count">
        Total Assets: {assets.length}
      </div>

      {/* Controls */}
      <div className="assets-controls">
        <input
          type="text"
          placeholder="Search Asset or Employee..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-dropdown"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Returned">Returned</option>
          <option value="Lost">Lost</option>
        </select>

        <button className="add-asset-button" onClick={() => setShowAddModal(true)}>
          + Add Asset
        </button>
      </div>

      {/* Asset Table */}
      <table className="assets-table">
        <thead>
          <tr>
            <th>Asset Name</th>
            <th>Type</th>
            <th>Serial Number</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Purchase Date</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssets.length > 0 ? (
            filteredAssets.map((asset, index) => (
              <tr key={index}>
                <td>{asset.assetName}</td>
                <td>{asset.assetType}</td>
                <td>{asset.serialNumber}</td>
                <td>{asset.assignedTo}</td>
                <td className={`status-${asset.status.toLowerCase()}`}>{asset.status}</td>
                <td>{asset.purchaseDate}</td>
                <td>{asset.notes}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No assets found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal to Add New Asset */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-button" onClick={() => setShowAddModal(false)}>×</button>
            <h3>Add New Asset</h3>
            <form onSubmit={handleAddAsset} className="add-asset-form">
              <input
                type="text"
                placeholder="Asset Name"
                value={newAsset.assetName}
                onChange={(e) => setNewAsset({ ...newAsset, assetName: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Asset Type"
                value={newAsset.assetType}
                onChange={(e) => setNewAsset({ ...newAsset, assetType: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Serial Number"
                value={newAsset.serialNumber}
                onChange={(e) => setNewAsset({ ...newAsset, serialNumber: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Assigned To"
                value={newAsset.assignedTo}
                onChange={(e) => setNewAsset({ ...newAsset, assignedTo: e.target.value })}
                required
              />
              <select
                value={newAsset.status}
                onChange={(e) => setNewAsset({ ...newAsset, status: e.target.value })}
                required
              >
                <option value="Active">Active</option>
                <option value="Returned">Returned</option>
                <option value="Lost">Lost</option>
              </select>
              <input
                type="date"
                value={newAsset.purchaseDate}
                onChange={(e) => setNewAsset({ ...newAsset, purchaseDate: e.target.value })}
                required
              />
              <textarea
                placeholder="Notes"
                value={newAsset.notes}
                onChange={(e) => setNewAsset({ ...newAsset, notes: e.target.value })}
              ></textarea>

              <button type="submit" className="save-button">Save Asset</button>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Assets;
