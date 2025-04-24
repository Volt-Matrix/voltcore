import React from "react";
import "./UserSummaryCard.css";

function UserSummaryCard({ profile }) {
  if (!profile) return <p>No profile selected.</p>;

  return (
    <div className="summary-card">
      <div className="summary-header">
        <img src={profile.profilePic || "/default-avatar.png"} alt="Profile" />
        <div>
          <h2>{profile.fullName}</h2>
          <p>{profile.employeeId} | {profile.gender}</p>
          <p>{profile.phone}</p>
          <p>{profile.email}</p>
        </div>
      </div>

      <div className="summary-section">
        <h3>Address</h3>
        <p><strong>Current:</strong> {profile.currentAddress}</p>
        <p><strong>Permanent:</strong> {profile.permanentAddress}</p>
        <p><strong>City:</strong> {profile.city}</p>
        <p><strong>State:</strong> {profile.state}</p>
        <p><strong>Country:</strong> {profile.country}</p>
        <p><strong>Zip:</strong> {profile.zip}</p>
      </div>
    </div>
  );
}

export default UserSummaryCard;
