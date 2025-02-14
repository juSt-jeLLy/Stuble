import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../../../context/AppContext';
import '../../../../styles/ShowAuction.css';

const ShowAuction = () => {
  const { EndObject } = React.useContext(AppContext);
  const data = EndObject || {};
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/AdminHome');
  };

  return (
    <div className="show-auction-container">
      <div className="show-auction-header">
        <button onClick={handleBack}>Back</button>
        <h2>{data.Name}</h2>
      </div>
      <div className="show-auction-body">
        <p>Description: {data.description}</p>
        <p>Unique Code: {data.Code}</p>
        <p>Starting Bid: {data.StartBid}</p>
        <p>Start Date: {data.startDate}</p>
        <p>End Date: {data.endDate}</p>
      </div>
    </div>
  );
};

export default ShowAuction;
