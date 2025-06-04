import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./ProfileList.css";

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch('http://localhost:8000/profiles/');
        if (!response.ok) throw new Error('Failed to fetch profiles');
        const data = await response.json();
        setProfiles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleEdit = (profile) => {
    navigate('/basic-details', { state: { profile } }); // ✅ pass full profile object
  };

  if (loading) return <p>Loading profiles...</p>;
  if (error) return <p>Error: {error}</p>;
  if (profiles.length === 0) return <p>No profiles found.</p>;

  
  const handleDelete = async (profileId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this profile?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(`http://localhost:8000/profiles/${profileId}/`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Remove from frontend list
      setProfiles(prev => prev.filter(profile => profile.id !== profileId));
      alert("Profile deleted successfully");
    } else {
      alert("Failed to delete profile.");
    }
  } catch (error) {
    console.error("Delete error:", error);
    alert("Error deleting profile");
  }
};


  return (
    <div className="profile-list-container">
      <h1 className='emp-head'>Employee Profiles</h1>
      <ul className="profile-list">
        {profiles.map(profile => (
          <li key={profile.id} className="profile-item">
            <img
              src={profile.profile_picture || "https://placehold.co/100x100"} 
              alt={profile.full_name}
              className="profile-list-image"
            />
            <div className="profile-info">
              <h3>{profile.full_name}</h3>
              <p><strong>Employee ID:</strong> {profile.employee_id}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone:</strong> {profile.phone}</p>
              <p><strong>City:</strong> {profile.city}</p>
              <p><strong>Country:</strong> {profile.country}</p>
              <button onClick={() => handleEdit(profile)} className="edit-btn">
                Edit
              </button>
              <button onClick={() => handleDelete(profile.id)} className="delete-btn">
              Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileList;
