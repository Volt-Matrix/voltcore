import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyAssets.css';
import { getCsrfToken } from "../../context/AuthContext/AuthContext";


const MyAssets = () => {
  const [assetData, setAssetData] = useState([]);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [assetTypes, setAssetTypes] = useState([]);

  const [formData, setFormData] = useState({
    asset_type: '',
    customCategory: '',
    description: '',
  });

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/my-assets/', {
          withCredentials: true,
        });
        setAssetData(response.data);
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };

      const fetchAssetTypes = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/assets/");  // or a new endpoint
          setAssetTypes(response.data);
        } catch (error) {
          console.error("Error fetching asset types:", error);
        }
    };
    fetchAssets();
    fetchAssetTypes();
    
  }, []);

  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  const handleReturnAsset = (index) => {
    alert(`Asset at row ${index + 1} marked for return.`);
    setDropdownIndex(null);
  };

  const handleReportIssue = (index) => {
    alert(`Reported issue for asset at row ${index + 1}. Notified admin.`);
    setDropdownIndex(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const csrfToken = await getCsrfToken();
      await axios.post(
        'http://localhost:8000/asset-request/',
        {
          asset_type: formData.asset_type,  
          description: formData.description,
        },
        
        {
           headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrfToken,  
        },
          withCredentials: true,
        }
      );
      alert('Asset Request Submitted');
      setFormData({ category: '', description: '' });
      setShowRequestForm(false);
    } catch (error) {
      console.error('Asset request failed:', error);
      alert('Asset Request Failed');
    }
  };

  return (
    <div className="my-assets-container">
      <div className="header">
        <h2>My Assigned Assets</h2>
        <button className="request-btn" onClick={() => setShowRequestForm(!showRequestForm)}>
          Asset Request
        </button>
      </div>

      {showRequestForm && (
        <div className="overlay">
          <div className="request-popup-card">
            <form className="request-form" onSubmit={handleFormSubmit}>
              <select
                name="asset_type"
                value={formData.asset_type}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Asset Type</option>
                {assetTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.assetName}
                  </option>
                ))}
              </select>

              {formData.category === 'other' && (
                <input
                  type="text"
                  name="customCategory"
                  placeholder="Enter custom asset category"
                  value={formData.customCategory || ''}
                  onChange={handleInputChange}
                  required
                  
                />
              )}

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
              <div className="form-buttons">
                <button type="submit">Submit</button>
                <button type="button" className="cancel-btn" onClick={() => setShowRequestForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="asset-card">
        <table className="table-style1">
          <thead>
            <tr>
              <th>Asset Type</th>
              <th>Asset ID</th>
              <th>Assigned Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assetData.map((asset, index) => (
              <tr key={index}>
                <td>{asset.asset_type}</td>
                <td>{asset.serial_number}</td>
                <td>{asset.assigned_date}</td>
                <td>{asset.status}</td>
                <td className="actions-cell">
                  <div className="actions-dropdown">
                    <button className="dots-btn" onClick={() => toggleDropdown(index)}>⋮</button>
                    {dropdownIndex === index && (
                      <div className="dropdown-menu">
                        <div onClick={() => handleReturnAsset(index)}>Return Asset</div>
                        <div onClick={() => handleReportIssue(index)}>Report Issue</div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAssets;
