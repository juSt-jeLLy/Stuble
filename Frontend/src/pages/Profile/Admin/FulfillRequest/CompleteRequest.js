import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../../../context/AppContext';
import '../../../../styles/CompleteRequest.css';

const CompleteRequest = () => {
  const { EndObject, FullfillRequest } = useContext(AppContext);
  const data = EndObject || {};
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/AdminHome');
  };

  const handleRequest = () => {
    FullfillRequest(data);
    navigate('/ClearReqForm');
  };

  return (
    <div className="complete-request-card">
      <div className="complete-request-header">
        <button onClick={handleBack}>Back</button>
        <h2>{data.email}</h2>
      </div>
      <div className="complete-request-body">
        <p>Mobile No: {data.mobileno}</p>
        <p>Size of Farm (in Acre): {data.acre}</p>
        <p>Type of Grains: {data.ptype}</p>
        <p>Planting Date: {data.date1}</p>
        <p>Start Date: {data.du1}</p>
        <p>End Date: {data.du2}</p>
        <p>Service Type: {data.type}</p>
        <p>Machines Required: {data.mtype}</p>
        <button className="fullfill-btn" onClick={handleRequest}>Fullfill Request</button>
      </div>
    </div>
  );
};

export default CompleteRequest;
