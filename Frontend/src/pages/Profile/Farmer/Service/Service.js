import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../../../styles/Service.css';
import AppContext from '../../../../context/AppContext';

const Service = () => {
  const { showAlert } = useContext(AppContext);
  const navigate = useNavigate();

  const [service, setService] = useState({
    email: "",
    mobileno: "",
    acre: "",
    ptype: "",
    date1: "",
    du1: "",
    du2: "",
    type: "",
    mtype: []
  });

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setService((prev) => ({ ...prev, mtype: [...prev.mtype, value] }));
    } else {
      setService((prev) => ({ ...prev, mtype: prev.mtype.filter((item) => item !== value) }));
    }
  };

  const Servicefun = async (e) => {
    e.preventDefault();
    const server = process.env.REACT_APP_SERVER;
    try {
      const { data } = await axios.post(`${server}/Service`, {
        ...service,
        mtype: JSON.stringify(service.mtype)
      });
      if (data.success) {
        showAlert(data.msg, 'success');
        navigate('/FarmerHome');
      } else {
        showAlert(data.msg, 'danger');
      }
    } catch (error) {
      showAlert('Something went wrong!', 'danger');
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };

  return (
    <div className="service-wrapper">
      <h1>Service Form</h1>
      <form onSubmit={Servicefun} className="service-form">
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={service.email}
          onChange={handleInput}
          required
        />

        <label>Phone no.</label>
        <input
          type="text"
          name="mobileno"
          value={service.mobileno}
          onChange={handleInput}
          required
        />

        <label>How much land you have? (in acres)</label>
        <input
          type="text"
          name="acre"
          value={service.acre}
          onChange={handleInput}
          required
        />

        <label>Which crops are planted in your field?</label>
        <input
          type="text"
          name="ptype"
          value={service.ptype}
          onChange={handleInput}
          required
        />

        <label>When did you plant that crop?</label>
        <input
          type="date"
          name="date1"
          value={service.date1}
          onChange={handleInput}
        />

        <label>Approx duration of harvesting (Start)</label>
        <input
          type="date"
          name="du1"
          value={service.du1}
          onChange={handleInput}
        />

        <label>Approx duration of harvesting (End)</label>
        <input
          type="date"
          name="du2"
          value={service.du2}
          onChange={handleInput}
        />

        <label>What do you want to give?</label>
        <div>
          <label>
            <input
              type="radio"
              name="type"
              value="Only Residue"
              onChange={(e) => setService({ ...service, type: e.target.value })}
            />
            Only Residue
          </label>
          <label style={{ marginLeft: '1rem' }}>
            <input
              type="radio"
              name="type"
              value="Both Residue & Grains"
              onChange={(e) => setService({ ...service, type: e.target.value })}
            />
            Both Residue & Grains
          </label>
        </div>

        <label>Select Machine(s) you need for harvesting</label>
        <div className="checkbox-list">
          <div className="checkbox-item">
            <input type="checkbox" value="Harvester" onChange={handleCheckbox} />
            <span>Harvester</span>
          </div>
          <div className="checkbox-item">
            <input type="checkbox" value="Tractor" onChange={handleCheckbox} />
            <span>Tractor</span>
          </div>
          <div className="checkbox-item">
            <input type="checkbox" value="Soil cultivator" onChange={handleCheckbox} />
            <span>Soil cultivator</span>
          </div>
          <div className="checkbox-item">
            <input type="checkbox" value="Disc Plough" onChange={handleCheckbox} />
            <span>Disc Plough</span>
          </div>
          <div className="checkbox-item">
            <input type="checkbox" value="Thresher" onChange={handleCheckbox} />
            <span>Thresher</span>
          </div>
        </div>

        <input type="submit" value="Request" className="service-submit" />
      </form>
    </div>
  );
};

export default Service;
