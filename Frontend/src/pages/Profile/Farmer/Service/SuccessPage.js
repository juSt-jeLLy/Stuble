import React from "react";
import Alert from "../../../../components/shared/Alert";
import '../../../../styles/SuccessPage.css';

const SuccessPage = () => {
  return (
    <div className="success-container">
      <h2>Your request has been successfully accepted!</h2>
      <p>
        Thank you for your request. Our team will review it and get back to you
        as soon as possible.
      </p>
      <Alert />
      <button className="success-getstarted-btn">Get Started</button>
    </div>
  );
};

export default SuccessPage;
