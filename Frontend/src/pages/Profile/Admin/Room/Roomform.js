import React, { useState, useContext } from 'react';
import axios from 'axios';
import '../../../../styles/RoomForm.css';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../../../context/AppContext';

const Roomform = () => {
  const { showAlert } = useContext(AppContext);
  const navigate = useNavigate();
  const [Room, setRoom] = useState({
    Name: "",
    description: "",
    Code: "",
    StartBid: "",
    startDate: "",
    endDate: ""
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const server = process.env.REACT_APP_SERVER;
    try {
      const { data } = await axios.post(`${server}/CreateRoom`, Room);
      if (data.success) {
        showAlert(data.msg, 'success');
        navigate('/AdminHome');
      } else {
        showAlert(data.msg, 'danger');
      }
    } catch (error) {
      showAlert('Something went wrong!', 'danger');
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setRoom({ ...Room, [name]: value });
  };

  return (
    <div className="room-form-container">
      <h1>Create a new auction room</h1>
      <form onSubmit={handleSubmit} method="post">
        <label>Name</label>
        <input
          type="text"
          name="Name"
          value={Room.Name}
          onChange={handleInput}
        />

        <label>Description</label>
        <input
          type="text"
          name="description"
          value={Room.description}
          onChange={handleInput}
        />

        <label>Unique Code</label>
        <input
          type="text"
          name="Code"
          value={Room.Code}
          onChange={handleInput}
        />

        <label>Starting Bid</label>
        <input
          type="number"
          name="StartBid"
          value={Room.StartBid}
          onChange={handleInput}
        />

        <label>Start Date</label>
        <input
          type="datetime-local"
          name="startDate"
          value={Room.startDate}
          onChange={handleInput}
        />

        <label>End Date</label>
        <input
          type="datetime-local"
          name="endDate"
          value={Room.endDate}
          onChange={handleInput}
        />

        <button type="submit" style={{ marginTop: '1rem' }}>Create Room</button>
      </form>
    </div>
  );
};

export default Roomform;
