import React from "react";
import { FaUser, FaShoppingCart, FaCog } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import "../../styles/Option.css";

const OptionLogin = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="option-container">
      <div className="option-card" onClick={() => handleNavigation("/LoginFarmer")}>
        <FaUser className="option-icon" />
        <span className="option-label">Farmer</span>
      </div>
      <div className="option-card" onClick={() => handleNavigation("/LoginCompany")}>
        <FaShoppingCart className="option-icon" />
        <span className="option-label">Buyer</span>
      </div>
      <div className="option-card" onClick={() => handleNavigation("/LoginAdmin")}>
        <FaCog className="option-icon" />
        <span className="option-label">Admin</span>
      </div>
    </div>
  );
};

export default OptionLogin;
