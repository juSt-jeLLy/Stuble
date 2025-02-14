import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaShoppingCart, FaCog } from 'react-icons/fa';
import "../../styles/Option.css";

const OptionSignup = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="option-container">
      <div className="option-card" onClick={() => handleNavigation("/SignUpFarmer")}>
        <FaUser className="option-icon" />
        <span className="option-label">Farmer</span>
      </div>
      <div className="option-card" onClick={() => handleNavigation("/SignUpCompany")}>
        <FaShoppingCart className="option-icon" />
        <span className="option-label">Buyer</span>
      </div>
      <div className="option-card" onClick={() => handleNavigation("/SignUpAdmin")}>
        <FaCog className="option-icon" />
        <span className="option-label">Admin</span>
      </div>
    </div>
  );
};

export default OptionSignup;
