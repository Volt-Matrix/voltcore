import React, { useState, useEffect } from "react";
import axios from "axios";
import AssetListTab from "./AssetListTab"; 
import "./AssetCategorySection.css";
import { getCsrfToken } from "../../context/AuthContext/AuthContext";


const groupAssets = (list) => {
  const grouped = {};
  list.forEach((asset) => {
    const { assetName, status } = asset;
    if (!grouped[assetName]) {
      grouped[assetName] = {
        assetType: assetName,
        description: "N/A",
        total: 0,
        available: 0,
        status: "Active",
      };
    }
    grouped[assetName].total += 1;
    if (status === "Available") {
      grouped[assetName].available += 1;
    }
  });
  return Object.values(grouped);
};

const AssetCategorySection = () => {
  const [categories, setCategories] = useState(["IT Assets", "Stationary"]);
  const [newCategory, setNewCategory] = useState("");
  const [assets, setAssets] = useState({});
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showAssetFormFor, setShowAssetFormFor] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [assetSearchTerm, setAssetSearchTerm] = useState("");
  const [expandedAssetType, setExpandedAssetType] = useState(null);
  const [editingAssetIndex, setEditingAssetIndex] = useState(null);
  const [itAssets, setItAssets] = useState([]); // store original asset list
  const [categoryMap, setCategoryMap] = useState({});

   useEffect(() => {
    fetchCategories();
    fetchAssets();
  }, []);

  useEffect(() => {
    if (!selectedCategory && categories.length > 0 && assets[categories[0]]) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, assets]);


  const refreshAssets = async () => {
    await fetchAssets();
    await fetchCategories();
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/asset-categories/");
      const data = res.data;
      setCategories(data.map((cat) => cat.name));
      const map = {};
      data.forEach((cat) => {
        map[cat.name] = cat.id;
      });
      setCategoryMap(map);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  const fetchAssets = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/assets/");
      const allAssets = res.data;
      setItAssets(allAssets); 
      const grouped = {};
      allAssets.forEach((asset) => {
        const catName = asset.category_name || "Uncategorized";
        if (!grouped[catName]) grouped[catName] = [];
        grouped[catName].push({
          id: asset.id,
          assetType: asset.assetName,
          description: asset.description,
          total: asset.total,
          available: asset.available,
          status: asset.status,
        });
      });
      setAssets(grouped);
    } catch (err) {
      console.error("Failed to load assets", err);
    }
  };


   const handleAddCategory = async () => {
    if (!newCategory.trim() || categories.includes(newCategory)) return;
    try {
      const csrf = await getCsrfToken();
      await axios.post(
        "http://localhost:8000/api/asset-categories/",
        { name: newCategory },
        {
          headers: { "X-CSRFToken": csrf },
          withCredentials: true,
        }
      );
      setNewCategory("");
      setShowCategoryForm(false);
      fetchCategories();
    } catch (err) {
      console.error("Failed to add category", err);
    }
  };
  const handleAddAsset = async (category, asset) => {
    try {
      const csrf = await getCsrfToken();
      const categoryId = categoryMap[category];
      await axios.post(
        "http://localhost:8000/api/assets/",
        {
          assetName: asset.assetType,
          description: asset.description,
          total: asset.total,
          available: asset.available,
          status: asset.status,
          category: categoryId,
        },
        {
          headers: { "X-CSRFToken": csrf },
          withCredentials: true,
        }
      );
      fetchAssets();
      setShowAssetFormFor(null);
    } catch (err) {
      console.error("Error adding asset", err);
    }
  };


 const handleUpdateAsset = async (index, updatedAsset) => {
    const assetToUpdate = assets[selectedCategory][index];
    try {
      const csrf = await getCsrfToken();
      await axios.put(
        `http://localhost:8000/api/assets/${assetToUpdate.id}/`,
        {
          assetName: updatedAsset.assetType,
          description: updatedAsset.description,
          total: updatedAsset.total,
          available: updatedAsset.available,
          status: updatedAsset.status,
          category: categoryMap[selectedCategory],
        },
        {
          headers: { "X-CSRFToken": csrf },
          withCredentials: true,
        }
      );
      fetchAssets();
      setEditingAssetIndex(null);
    } catch (err) {
      console.error("Error updating asset", err);
    }
  };

 const handleDeleteAsset = async (index) => {
    const assetToDelete = assets[selectedCategory][index];
    if (!window.confirm("Are you sure you want to delete this asset?")) return;
    try {
      const csrf = await getCsrfToken();
      await axios.delete(`http://localhost:8000/api/assets/${assetToDelete.id}/`, {
        headers: { "X-CSRFToken": csrf },
        withCredentials: true,
      });
      fetchAssets();
    } catch (err) {
      console.error("Error deleting asset", err);
    }
  };

  const filteredCategories = categories.filter((cat) =>
    cat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAssets = assets[selectedCategory]?.filter((asset) =>
    asset.assetType.toLowerCase().includes(assetSearchTerm.toLowerCase())
  );

  return (
    <div className="category-type-layout">
      <div className="category-sidebar">
        <input
          className="search-input"
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn-add" onClick={() => setShowCategoryForm(!showCategoryForm)}>
          {showCategoryForm ? "Cancel" : "Add Category"}
        </button>
        {showCategoryForm && (
          <div className="form-row">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category name"
            />
            <button className="btn-add" onClick={handleAddCategory}>Add</button>
          </div>
        )}
        <div className="category-list">
          {filteredCategories.map((cat, idx) => (
            <div
              key={idx}
              className={`category-item ${selectedCategory === cat ? "selected" : ""}`}
              onClick={() => {
                setSelectedCategory(cat);
                setAssetSearchTerm("");
              }}
            >
              {cat} ({assets[cat]?.length || 0})
            </div>
          ))}
        </div>
      </div>

      <div className="category-details-panel">
        <div className="panel-header">
          <h3>{selectedCategory || "Select a Category"}</h3>
          {selectedCategory && (
            <button className="btn-add" onClick={() => {
              setShowAssetFormFor(selectedCategory);
              setEditingAssetIndex(null);
            }}>
              Add Asset Type
            </button>
          )}
        </div>

        {showAssetFormFor === selectedCategory && editingAssetIndex === null && (
          <AssetForm 
            categories={categories} 
            onSubmit={(asset) => handleAddAsset(asset.selectedCategory, asset)}
            onCancel={() => setShowAssetFormFor(null)} 
            defaultCategory={selectedCategory}
          />
        )}


        {editingAssetIndex !== null && (
          <AssetForm
            categories={categories}
            asset={assets[selectedCategory][editingAssetIndex]}
            onSubmit={(updatedAsset) => handleUpdateAsset(editingAssetIndex, updatedAsset)}
            onCancel={() => setEditingAssetIndex(null)}
          />
        )}


        {selectedCategory && (
          <div className="asset-card-container">
            <div className="asset-card-header">
              <h4>{selectedCategory}</h4>
            </div>

            <input
              className="search-input"
              type="text"
              placeholder="Search assets..."
              value={assetSearchTerm}
              onChange={(e) => setAssetSearchTerm(e.target.value)}
              style={{ marginBottom: "10px", width: "100%" }}
            />

            <table className="table-style1">
              <thead>
                <tr>
                  <th>Asset Type</th>
                  <th>Description</th>
                  <th>Total Count</th>
                  <th>Available Count</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets?.length ? (
                  filteredAssets.map((asset, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{asset.assetType}</td>
                        <td>{asset.description || "N/A"}</td>
                        <td>{asset.total}</td>
                        <td>
                          {asset.available}
                          {parseInt(asset.available) < 3 && (
                          <span className="warning-icon">⚠️</span>
                        )}
                        </td>
                        <td>
                          <span className={`status-tag ${asset.status.toLowerCase()}`}>
                            {asset.status}
                          </span>
                        </td>
                        <td style={{ display: "flex", gap: "4px" }}>
                          <button
                            className="icon-button"
                            onClick={() => {
                              setEditingAssetIndex(index);
                              setShowAssetFormFor(null);
                            }}
                          >
                            ✏️
                        </button>
                        <button
                          className="icon-button"
                          onClick={() => handleDeleteAsset(index)}
                        >
                          🗑️
                        </button>
                        <button
                          className="icon-button"
                          onClick={() =>
                            setExpandedAssetType(
                              expandedAssetType === asset.assetType ? null : asset.assetType
                            )
                          }
                        >
                          {expandedAssetType === asset.assetType ? "🔽" : "▶️"}
                        </button>
                      </td>
                    </tr>

                    {expandedAssetType === asset.assetType && (
                      <tr>
                        <td colSpan="6">
                          <AssetListTab
                            assetList={itAssets.filter(
                              (item) =>
                                item.assetName === asset.assetType &&
                                item.category_name === selectedCategory
                            )}
                            selectedAssetId={asset.id}
                            onAssetsUpdated={refreshAssets}
                          />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))

                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      No assets found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const AssetForm = ({ asset = {}, onSubmit, onCancel, categories = [], defaultCategory = "" }) => {

  const [assetType, setAssetType] = useState(asset.assetType || "");
  const [description, setDescription] = useState(asset.description || "");
  const [total, setTotal] = useState(asset.total || "");
  const [available, setAvailable] = useState(asset.available || "");
  const [status, setStatus] = useState(asset.status || "Active");
  const [selectedCategory, setSelectedCategory] = useState(
  asset.selectedCategory || defaultCategory || (categories.length > 0 ? categories[0] : "")
  );


  const handleSubmit = () => {
    if (!selectedCategory) {
      alert("Please select a category");
      return;
    }
    if (assetType && total && available && status) {
      onSubmit({
        assetType,
        description: description || "N/A",
        total: parseInt(total),
        available: parseInt(available),
        status,
        selectedCategory,
      });
      
      if (!asset.assetType) {
        setAssetType("");
        setDescription("");
        setTotal("");
        setAvailable("");
        setStatus("Active");
        setSelectedCategory(defaultCategory || (categories.length > 0 ? categories[0] : ""));
      }
    }
  };

  return (
    <div className="asset-form-container">
  <div className="form-row">
    <div className="form-field">
      <label>Asset Type<span className="required">*</span></label>
      <input value={assetType} onChange={(e) => setAssetType(e.target.value)} />
    </div>

    <div className="form-field">
      <label>Description</label>
      <input value={description} onChange={(e) => setDescription(e.target.value)} />
    </div>

    <div className="form-field">
      <label>Total Count<span className="required">*</span></label>
      <input type="number" value={total} onChange={(e) => setTotal(e.target.value)} />
    </div>

    <div className="form-field">
      <label>Available Count<span className="required">*</span></label>
      <input type="number" value={available} onChange={(e) => setAvailable(e.target.value)} />
    </div>

    <div className="form-field">
      <label>Status</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>Active</option>
        <option>Inactive</option>
      </select>
    </div>

    <div className="form-field">
      <label>Category</label>
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
  <option value="" disabled>Select Category</option>
  {categories.map((cat, idx) => (
    <option key={idx} value={cat}>{cat}</option>
  ))}
</select>

      
    </div>
  </div>

  <div className="form-actions">
    <button className="btn-save" onClick={handleSubmit}> Save</button>
    {onCancel && <button className="btn-Cancel" onClick={onCancel}> Cancel</button>}
  </div>
</div>

  );
};

export default AssetCategorySection;