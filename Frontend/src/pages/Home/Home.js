import React from 'react';
import { useNavigate } from 'react-router-dom';
import Contact from '../../components/Contact/Contact';
import Aboutus from '../../components/About/AboutUs';
import Carousel from '../../components/Carousel/Carousel';
import Piechart from '../../components/PieChart/PieChart';
import '../../styles/Home.css';
import { countries } from '../../utils/helpers';

const Home = () => {
  const navigate = useNavigate();

  const HandleResearch = () => {
    navigate('/Research');
  };

  return (
    <div className="container" id="HOME">
      <div className="home-carousel">
        <Carousel images={countries} />
      </div>

      {/* Example sections */}
      <div className="home-section">
        <div className="home-section-text">
          <h3>Pollution Because of Burning of Residue</h3>
          <p>
            While more than 80% of Indian cities struggle with unhealthy air quality, 
            stubble burning worsens the scenario in northern regions...
          </p>
        </div>
        <div className="home-section-image">
          <img src="../images/farm2.jpg" alt="farm" />
        </div>
      </div>

      <div className="home-section">
        <div className="home-section-image">
          <img src="../images/farmer1.jpeg" alt="farmer" />
        </div>
        <div className="home-section-text">
          <h3>The Problem ???</h3>
          <p>
            One report states that about 500 million tons of agricultural residue is produced each year, 
            of which nearly 92 million tons is burnt, leading to severe air pollution...
          </p>
        </div>
      </div>

      <div className="home-section">
        <div className="home-section-text">
          <h3>Side Effects of Stubble Burning</h3>
          <p>
            Crop residue burning significantly increases air pollutants such as CO2, CO, NH3, NOX, 
            SOX, and PM. This practice also leads to the loss of essential nutrients in soil...
          </p>
        </div>
        <div className="home-section-image">
          <img src="../images/farm1.jpeg" alt="stubble" />
        </div>
      </div>

      <div className="home-section">
        <div className="home-section-image" style={{ flex: 1 }}>
          <Piechart />
        </div>
        <div className="home-section-text" style={{ flex: 1 }}>
          <h3>Check Our Residue Prediction</h3>
          <p>Learn how much residue might be generated on your farmland!</p>
          <button className="learn-more-btn" onClick={HandleResearch}>Learn More</button>
        </div>
      </div>

      <Contact />
      <Aboutus />
    </div>
  );
};

export default Home;
