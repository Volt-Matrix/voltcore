import React, { useState } from "react";
import BasicDetails from "./BasicDetails"; 
import "./ProfileList.css";

const initialProfiles = [
  {
    fullName: "Aarav Mehta",
    employeeId: "EMP1001",
    dob: "1990-05-14",
    gender: "Male",
    email: "aarav@example.com",
    phone: "9876543210",
    altPhone: "9123456789",
    profilePic: "profile1.jpg",
    currentAddress: "123 Mumbai St.",
    permanentAddress: "456 Delhi Rd.",
    city: "Mumbai",
    state: "Maharashtra",
    zip: "400001",
    country: "India"
  },
  {
    fullName: "Saanvi Sharma",
    employeeId: "EMP1002",
    dob: "1992-08-23",
    gender: "Female",
    email: "saanvi@example.com",
    phone: "8765432109",
    altPhone: "9321654789",
    profilePic: "profile2.jpg",
    currentAddress: "789 Bangalore St.",
    permanentAddress: "101 Chennai Rd.",
    city: "Bangalore",
    state: "Karnataka",
    zip: "560001",
    country: "India"
  },
  {
    fullName: "Vihaan Reddy",
    employeeId: "EMP1003",
    dob: "1988-01-10",
    gender: "Male",
    email: "vihaan.reddy@example.com",
    phone: "9123456700",
    altPhone: "9876543211",
    profilePic: null,
    currentAddress: "5th Cross, Koramangala, Bangalore",
    permanentAddress: "12, Gandhi Road, Hyderabad",
    city: "Bangalore",
    state: "Karnataka",
    zip: "560034",
    country: "India",
  },
  {
    fullName: "Ananya Iyer",
    employeeId: "EMP1004",
    dob: "1995-11-30",
    gender: "Female",
    email: "ananya.iyer@example.com",
    phone: "9001234567",
    altPhone: "9321987654",
    profilePic: null,
    currentAddress: "Block 7, Anna Nagar, Chennai",
    permanentAddress: "Street 10, Adyar, Chennai",
    city: "Chennai",
    state: "Tamil Nadu",
    zip: "600040",
    country: "India",
  },
  {
    fullName: "Karthik Patel",
    employeeId: "EMP1005",
    dob: "1991-07-19",
    gender: "Male",
    email: "karthik.patel@example.com",
    phone: "9812345678",
    altPhone: "9876123456",
    profilePic: null,
    currentAddress: "Opposite ISKCON, Ahmedabad",
    permanentAddress: "Sector 8, Gandhinagar",
    city: "Ahmedabad",
    state: "Gujarat",
    zip: "380001",
    country: "India",
  },
  {
    fullName: "Meera Joshi",
    employeeId: "EMP1006",
    dob: "1993-03-12",
    gender: "Female",
    email: "meera.joshi@example.com",
    phone: "9004567890",
    altPhone: "9223344556",
    profilePic: null,
    currentAddress: "Banjara Hills, Hyderabad",
    permanentAddress: "Begumpet, Hyderabad",
    city: "Hyderabad",
    state: "Telangana",
    zip: "500034",
    country: "India",
  },
  {
    fullName: "Rohan Das",
    employeeId: "EMP1007",
    dob: "1987-09-05",
    gender: "Male",
    email: "rohan.das@example.com",
    phone: "9933221100",
    altPhone: "9988001122",
    profilePic: null,
    currentAddress: "Salt Lake, Kolkata",
    permanentAddress: "Garia, Kolkata",
    city: "Kolkata",
    state: "West Bengal",
    zip: "700064",
    country: "India",
  },
  {
    fullName: "Priya Menon",
    employeeId: "EMP1008",
    dob: "1994-12-01",
    gender: "Female",
    email: "priya.menon@example.com",
    phone: "9898989898",
    altPhone: "9777777777",
    profilePic: null,
    currentAddress: "Panampilly Nagar, Kochi",
    permanentAddress: "Aluva, Kochi",
    city: "Kochi",
    state: "Kerala",
    zip: "682036",
    country: "India",
  },
  {
    fullName: "Aditya Roy",
    employeeId: "EMP1009",
    dob: "1990-04-17",
    gender: "Male",
    email: "aditya.roy@example.com",
    phone: "9111223344",
    altPhone: "9334455667",
    profilePic: null,
    currentAddress: "Civil Lines, Lucknow",
    permanentAddress: "Aliganj, Lucknow",
    city: "Lucknow",
    state: "Uttar Pradesh",
    zip: "226001",
    country: "India",
  },
  {
    fullName: "Neha Kapoor",
    employeeId: "EMP1010",
    dob: "1996-06-23",
    gender: "Female",
    email: "neha.kapoor@example.com",
    phone: "9000000001",
    altPhone: "9888888888",
    profilePic: null,
    currentAddress: "Gomti Nagar, Lucknow",
    permanentAddress: "Hazratganj, Lucknow",
    city: "Lucknow",
    state: "Uttar Pradesh",
    zip: "226010",
    country: "India",
  },

];
function ProfileList() {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [editingProfile, setEditingProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("");

  const handleEdit = (profile) => {
    setEditingProfile(profile);
  };

  const handleSave = (updatedProfile) => {
    const updatedProfiles = profiles.map((p) =>
      p.employeeId === updatedProfile.employeeId ? updatedProfile : p
    );
    setProfiles(updatedProfiles);
    setEditingProfile(null);
  };

  const filteredProfiles = profiles.filter((profile) => {
    const matchesSearch =
      profile.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.employeeId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCity = cityFilter
      ? profile.city.toLowerCase() === cityFilter.toLowerCase()
      : true;

    return matchesSearch && matchesCity;
  });

  const uniqueCities = [...new Set(profiles.map((p) => p.city))];

  if (editingProfile) {
    return <BasicDetails profileData={editingProfile} onSave={handleSave} />;
  }

  return (
    <div className="profile-list-container">
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
          <option value="">All Cities</option>
          {uniqueCities.map((city, i) => (
            <option key={i} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <div className="profile-table-wrapper">
        <table className="profile-table">
          <thead>
            <tr>
              
              <th>Full Name</th>
              <th>Employee ID</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProfiles.map((profile, index) => (
              <tr key={index}>
              
                  
          
                <td>{profile.fullName}</td>
                <td>{profile.employeeId}</td>
                <td>{profile.gender}</td>
                <td>{profile.email}</td>
                <td>
                  <button onClick={() => handleEdit(profile)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProfileList;