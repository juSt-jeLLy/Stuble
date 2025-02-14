import React from 'react';
import Contact from '../../../../components/Contact/Contact';
import Aboutus from '../../../../components/About/AboutUs';
import Carousel from '../../../../components/Carousel/Carousel';
import Piechart from '../../../../components/PieChart/PieChart';
import { useNavigate } from 'react-router-dom';
import '../../../../styles/CompanyHome.css';
import { countries } from '../../../../utils/helpers';

const CompanyHome = () => {
  const navigate = useNavigate();

  const HandleResearch = () => {
    navigate('/Research');
  };

  const handleAuction = () => {
    navigate('/Auction');
  };

  return (
    <div className="company-home-container">
      <div className="company-top-section">
        <Carousel images={countries} />
      </div>

      <div className="company-service-btn">
        <button onClick={handleAuction}>Go to Auction</button>
      </div>

      <div className="datacontainer" style={{ marginTop: '2rem' }}>
        <h3>Pollution</h3>
        <p>
          While more than 80% of Indian cities struggle with unhealthy air quality,
          stubble burning worsens the scenario in northern regions...
        </p>
      </div>

      <div className="datacontainer" style={{ marginTop: '2rem' }}>
        <h3>Residue</h3>
        <p>
          The burning of crop residues generates numerous environmental problems
          including GHG emissions and smog...
        </p>
      </div>

      <div className="datacontainer" style={{ marginTop: '2rem' }}>
        <h3>Side-effects</h3>
        <p>
          Crop residue burning significantly increases air pollutants such as CO2, CO, 
          NH3, NOX, SOX, and more...
        </p>
      </div>

      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap:'wrap' }}>
        <div style={{ flex: 1 }}>
          <Piechart />
        </div>
        <div style={{ flex: 1 }}>
          <h3>Check Our Residue Prediction</h3>
          <p>Learn how much residue might be generated on farmland!</p>
          <button onClick={HandleResearch}>Learn More</button>
        </div>
      </div>

      <Contact />
      <Aboutus />
    </div>
  );
};

export default CompanyHome;
