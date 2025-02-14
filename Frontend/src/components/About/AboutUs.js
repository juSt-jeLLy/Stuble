import React from 'react';

function showMore() {
  const moreInfo = document.getElementById("more-info");
  if (moreInfo) {
    moreInfo.classList.remove("d-none");
  }
  const btn = document.querySelector("button.btn-primary");
  if (btn) {
    btn.style.display = "none";
  }
}

const Aboutus = () => {
  return (
    <div className="container" id="about">
      <h1 className="text-center mb-2">About Us</h1>
      <div className="card">
        <p>
          Welcome to our website for agricultural waste management solutions! We are dedicated
          to providing sustainable and innovative ways to help farmers manage their waste
          responsibly.
        </p>
        <p>
          Our team is passionate about finding solutions that benefit both farmers and the environment.
          We believe in working closely with clients to develop customized approaches.
        </p>
        <button className="btn-primary" onClick={showMore} style={{ marginTop: '1rem' }}>
          Show More
        </button>
        <div id="more-info" className="d-none" style={{ marginTop: '1rem' }}>
          <p>
            We focus on reducing environmental impact and contributing to a cleaner planet. 
            Thank you for visiting and we look forward to partnering with you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
