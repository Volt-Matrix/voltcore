import React, { useState, useEffect } from "react";
import "./AssetDashboard.css";
import AssetCategorySection from "./AssetCategorySection";
import AssetPR from "./AssetPR";
import axios from "axios"; 
import {
  FaCheckCircle,
  FaHourglass,
  FaTools,
  FaExclamationCircle,
  FaQuestionCircle,
} from "react-icons/fa";

const tabs = ["Dashboard", "Asset category", "Asset PR"];

const AssetDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [statusCounts, setStatusCounts] = useState({
    Available: 0,
    Assigned: 0,
    "In Repair": 0,
    Retired: 0,
    Lost: 0,
  });
  const [showStatus, setShowStatus] = useState(true);

  const [pendingRequests, setPendingRequests] = useState(0);
  const totalAssets =
    statusCounts["Available"] +
    statusCounts["Assigned"] +
    statusCounts["In Repair"] +
    statusCounts["Retired"] +
    statusCounts["Lost"];
  const licenseDue = 0;
  const licenseUpcoming = 0;
  const warrantyDue = 0;
  const warrantyUpcoming = 0;

  
  useEffect(() => {
    const fetchAssetStatusCounts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/asset-list/");
        const assetList = response.data;

        const counts = {
          Available: 0,
          Assigned: 0,
          "In Repair": 0,
          Retired: 0,
          Lost: 0,
        };

        assetList.forEach((asset) => {
          if (counts.hasOwnProperty(asset.status)) {
            counts[asset.status]++;
          }
        });

        setStatusCounts(counts);
      } catch (error) {
        console.error("Error fetching asset list:", error);
      }
    };

    const fetchPendingRequests = async () => {
    try {
      const response = await axios.get("http://localhost:8000/asset-request/");
      const allRequests = response.data;
      const pendingCount = allRequests.filter(req => req.status === "Pending").length;
      setPendingRequests(pendingCount);
    } catch (error) {
      console.error("Error fetching pending requests:", error);
    }
  };

    fetchAssetStatusCounts();
    fetchPendingRequests();
  }, []);

  return (
    <div className="asset-container">
      {/* Top Tabs */}
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Dashboard */}
      {activeTab === "Dashboard" && (
        <>
          <h2>Assets</h2>
          <div className="top-summary">
            <div className="card blue">
              <h3>{totalAssets}</h3>
              <p>Total Assets</p>
            </div>
            <div className="card green">
              <h3>{pendingRequests}</h3>
              <p>Pending Requests</p>
            </div>
            <div className="card gray">
              <div className="row">
                <div><h4>{licenseDue}</h4><p>Due</p></div>
                <div><h4>{licenseUpcoming}</h4><p>Upcoming</p></div>
              </div>
              <p>License Renewal</p>
            </div>
            <div className="card red">
              <div className="row">
                <div><h4>{warrantyDue}</h4><p>Due</p></div>
                <div><h4>{warrantyUpcoming}</h4><p>Upcoming</p></div>
              </div>
              <p>Warranty Renewal</p>
            </div>
          </div>

          
          <div className="status-section">
            <div className="status-header" onClick={() => setShowStatus(!showStatus)}>
              <h3>Assets Status</h3>
            </div>
            {showStatus && (
              <div className="status-summary">
                <StatusCard icon={<FaCheckCircle />} color="available" count={statusCounts["Available"]} label="Available" />
                <StatusCard icon={<FaHourglass />} color="assigned" count={statusCounts["Assigned"]} label="Assigned" />
                <StatusCard icon={<FaTools />} color="repair" count={statusCounts["In Repair"]} label="In Repair" />
                <StatusCard icon={<FaExclamationCircle />} color="broken" count={statusCounts["Retired"]} label="Retired" />
                <StatusCard icon={<FaQuestionCircle />} color="lost" count={statusCounts["Lost"]} label="Lost" />
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === "Asset category" && <AssetCategorySection />}
      {activeTab === "Asset PR" && <AssetPR />}
    </div>
  );
};

const StatusCard = ({ icon, color, count, label }) => (
  <div className="status-card">
    <div className={`status-icon ${color}`}>{icon}</div>
    <h4>{count}</h4>
    <p>{label}</p>
  </div>
);

export default AssetDashboard;
