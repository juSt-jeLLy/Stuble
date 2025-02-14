import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../../../context/AppContext';
import '../../../../styles/ClearReqForm.css';

const ClearReqForm = () => {
  const { showAlert, EndObject } = useContext(AppContext);
  const navigate = useNavigate();
  const SerData = EndObject || {};

  const [ClearedList, setClearedList] = useState({
    tResidue: '',
    tgrain: '',
    sdate: ''
  });

  const ClearRequest = async (e) => {
    e.preventDefault();
    const server = process.env.REACT_APP_SERVER;
    try {
      const { data } = await axios.post(`${server}/ClearReqForm`, {
        email: SerData.email,
        tResidue: ClearedList.tResidue,
        tgrain: ClearedList.tgrain,
        sdate: ClearedList.sdate
      });
      if (data.success) {
        showAlert(data.message, 'success');
        navigate('/AdminHome');
      } else {
        showAlert(data.message, 'danger');
      }
    } catch (error) {
      showAlert('Something went wrong!', 'danger');
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setClearedList({ ...ClearedList, [name]: value });
  };

  return (
    <div className="clear-request-container">
      <h1>Service Submission</h1>
      <form onSubmit={ClearRequest}>
        <label>Total Residue collected</label>
        <input
          type="text"
          required
          name="tResidue"
          value={ClearedList.tResidue}
          onChange={handleInput}
        />

        <label>Total Grains</label>
        <input
          type="text"
          required
          name="tgrain"
          value={ClearedList.tgrain}
          onChange={handleInput}
        />

        <label>FullFill Date</label>
        <input
          type="date"
          required
          name="sdate"
          value={ClearedList.sdate}
          onChange={handleInput}
        />

        <button type="submit" style={{marginTop:'1rem'}}>Submit</button>
      </form>
    </div>
  );
};

export default ClearReqForm;
