import React, { useContext, useState, useEffect } from 'react';
import '../../../styles/Profile.css';
import AppContext from '../../../context/AppContext';

const Profile = () => {
  const { user, setUser } = useContext(AppContext);
  const [farmerDetails, setFarmerDetails] = useState({
    Address: '',
    CropsType: '',
    LandSize: ''
  });

  const handleChange = (event) => {
    setFarmerDetails({
      ...farmerDetails,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(farmerDetails);
    // Example: you can handle saving these details to the server
  };

  useEffect(() => {
    let u = JSON.parse(localStorage.getItem("userLogin"));
    u ? setUser(u) : setUser(null);
  }, [setUser]);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Account Profile</h1>
      </div>
      <div className="profile-info">
        <p><strong>Name:</strong> {user ? user.name : 'N/A'}</p>
        <p><strong>Phone:</strong> {user ? user.mobileno : 'N/A'}</p>
        <p><strong>Email:</strong> {user ? user.email : 'N/A'}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <label>Address</label>
        <input
          type="text"
          name="Address"
          value={farmerDetails.Address}
          onChange={handleChange}
        />

        <label>Types of crops</label>
        <input
          type="text"
          name="CropsType"
          value={farmerDetails.CropsType}
          onChange={handleChange}
        />

        <label>Land Size (in Acre)</label>
        <input
          type="text"
          name="LandSize"
          value={farmerDetails.LandSize}
          onChange={handleChange}
        />

        <button type="submit" className="update-profile-btn">Update Profile</button>
      </form>

      <div style={{ marginTop: '2rem' }}>
        <h3>Preview:</h3>
        <p>Address: {farmerDetails.Address}</p>
        <p>Types of Crops: {farmerDetails.CropsType}</p>
        <p>Land Size: {farmerDetails.LandSize}</p>
      </div>
    </div>
  );
};

export default Profile;
