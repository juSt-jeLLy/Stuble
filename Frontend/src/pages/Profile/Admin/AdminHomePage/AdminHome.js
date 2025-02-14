import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../../styles/AdminHome.css';
import axios from 'axios';
import AppContext from '../../../../context/AppContext';

const AdminHome = () => {
  const { FullfillRequest } = useContext(AppContext);
  const navigate = useNavigate();

  const [room, setRoom] = useState([]);
  const [service, setService] = useState([]);

  const getData = async () => {
    try {
      const server = process.env.REACT_APP_SERVER;
      const { data } = await axios.post(`${server}/AdminHome`);
      if (data?.room && data?.Service) {
        setRoom(data.room);
        setService(data.Service);
      } else {
        alert(data?.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleRequest = (ele, path) => {
    FullfillRequest(ele);
    navigate(path);
  };

  return (
    <div className="admin-home-container">
      <div className="admin-section">
        <h2>Available Rooms:</h2>
        <div className="admin-list">
          {room.length > 0 ? (
            room.map((ele) => (
              <button
                key={ele.Name}
                onClick={() => handleRequest(ele, '/ShowAuction')}
              >
                {ele.Name}
              </button>
            ))
          ) : (
            <span>No rooms available</span>
          )}
        </div>
      </div>

      <div className="admin-section">
        <h2>Pending Services:</h2>
        <div className="admin-list">
          {service.length > 0 ? (
            service.map((ele) => (
              <button
                key={ele.email}
                onClick={() => handleRequest(ele, '/CompleteRequest')}
              >
                {ele.email}
              </button>
            ))
          ) : (
            <span>No services pending</span>
          )}
        </div>
      </div>

      <button className="create-room-btn" onClick={() => navigate('/CreateRoom')}>
        Create Room
      </button>
    </div>
  );
};

export default AdminHome;
