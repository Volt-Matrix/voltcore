import React, { useEffect, useState } from 'react';
import "./ProfileList.css";

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleEdit = (profile) => setEditingProfile(profile);
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

  if (loading) return <p>Loading profiles...</p>;
  if (error) return <p>Error: {error}</p>;
  if (profiles.length === 0) return <p>No profiles found.</p>;

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
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileList;
