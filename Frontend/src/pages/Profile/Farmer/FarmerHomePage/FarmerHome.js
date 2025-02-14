import React from 'react';
import Contact from '../../../../components/Contact/Contact';
import Aboutus from '../../../../components/About/AboutUs';
import Carousel from '../../../../components/Carousel/Carousel';
import Piechart from '../../../../components/PieChart/PieChart';
import { useNavigate } from 'react-router-dom';
import '../../../../styles/FarmerHome.css';
import { countries } from '../../../../utils/helpers';

const FarmerHome = () => {
  const navigate = useNavigate();

  const HandleResearch = () => {
    navigate('/Research');
  };

  const handleService = () => {
    navigate('/Service');
  };

  return (
    <div className="farmer-home-container">
      <div className="farmer-carousel">
        <Carousel images={countries} />
      </div>

      <div className="farmer-service-btn">
        <button onClick={handleService}>Request a Service</button>
      </div>

      <div className="farmer-section">
        <div style={{ flex: 1 }}>
          <h3>Pollution</h3>
          <p>
            While more than 80% of Indian cities struggle with unhealthy air quality,
            the landlocked capital of New Delhi suffers the most...
          </p>
        </div>
        <img
          src="../images/farm2.jpg"
          alt="farm"
          style={{ flex: 1, borderRadius:'6px' }}
        />
      </div>

      <div className="farmer-section">
        <img
          src="../images/farmer1.jpeg"
          alt="farmer"
          style={{ flex: 1, borderRadius:'6px' }}
        />
        <div style={{ flex: 1 }}>
          <h3>Residue</h3>
          <p>
            The burning of crop residues generates numerous environmental problems...
          </p>
        </div>
      </div>

      <div className="farmer-section">
        <div style={{ flex: 1 }}>
          <h3>Side-Effects</h3>
          <p>
            Crop residue burning significantly increases the quantity of air pollutants...
          </p>
        </div>
        <img
          src="../images/farm1.jpeg"
          alt="stubble"
          style={{ flex: 1, borderRadius:'6px' }}
        />
      </div>

      <div className="farmer-section">
        <div style={{ flex: 1 }}>
          <Piechart />
        </div>
        <div style={{ flex: 1 }}>
          <h3>Check Our Residue Prediction</h3>
          <p>Learn how much residue might be generated on your farmland!</p>
          <button onClick={HandleResearch}>Learn More</button>
        </div>
      </div>

      <Contact />
      <Aboutus />
    </div>
  );
};

export default FarmerHome;
