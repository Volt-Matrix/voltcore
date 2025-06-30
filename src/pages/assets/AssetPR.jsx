import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AssetPR.css';
import { getCsrfToken } from "../../context/AuthContext/AuthContext";

const AssetPR = () => {
  const [assetRequests, setAssetRequests] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8000/asset-request/', {
        withCredentials: true,
      });
      setAssetRequests(response.data);
    } catch (error) {
      console.error('Error fetching asset requests:', error);
    }
  };

  const updateRequestStatus = async (id, newStatus) => {
    try {
      const csrf = await getCsrfToken();
      await axios.patch(
        `http://localhost:8000/asset-request/${id}/`,
        { status: newStatus },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrf,
          },
          withCredentials: true,
        }
      );
      fetchRequests(); 
    } catch (error) {
        const errorMsg = error.response?.data?.error || "Something went wrong";
        setErrorMessage(errorMsg);  // 👈 Set the error message
      }

  };

  return (
    <div className="asset-pr-container">
      <h2>Asset Purchase Requests (PR)</h2>
      <div className="asset-card">
        <table className="table-style1">
          <thead>
            <tr>
              <th>User</th>
              <th>Category</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assetRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.user_name}</td>
                <td>{request.category}</td>
                <td>{request.description}</td>
                <td>{request.status}</td>
                <td>
                  {request.status === 'Pending' ? (
                    <>
                      <button className="approve-btn" onClick={() => updateRequestStatus(request.id, 'Approved')}>
                        Approve
                      </button>
                      <button className="reject-btn" onClick={() => updateRequestStatus(request.id, 'Rejected')}>
                        Reject
                      </button>
                    </>
                  ) : (
                    <span>{request.status}</span>
                  )}
                </td>
              </tr>
            ))}
            {errorMessage && (
              <div className="error-banner">
                {errorMessage}
              </div>
            )}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetPR;
