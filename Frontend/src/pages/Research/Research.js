import React, { useState } from "react";
import '../../styles/Research.css';

const Research = () => {
  const [input, setInput] = useState('');
  const [box1, setBox] = useState('');
  const [residue1, setResidue] = useState('');
  const [price1, setPrice] = useState('');

  const jb = (e) => {
    e.preventDefault();
    const inq = input;
    const nbox = 120 * inq;
    setBox(nbox);
    const residue = 10 * nbox;
    setResidue(residue);
    const nPrice = 5 * residue;
    setPrice(nPrice);
  };

  return (
    <div className="research-container">
      <h1>Farm Size Analysis</h1>
      <form className="research-form" onSubmit={jb}>
        <label htmlFor="hectarInput">Enter size of farm (in hectare):</label>
        <input
          type="number"
          id="hectarInput"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <div className="research-result">
        <p>Box Generated: {box1}</p>
        <p>Total residue (kg): {residue1}</p>
        <p>Expected revenue (Rs): {price1}</p>
      </div>

      <div className="research-intro">
        <h2>Introduction</h2>
        <p>
          We have used well-known GIS software QGIS with the SCP (Semi-Automatic Classification Plugin)
          to analyze crop residue from satellite data. The plugin helps in supervised classification,
          preprocessing, and postprocessing of remote sensing images.
        </p>
      </div>

      <div className="research-images">
        <img src="../images/raw.png" alt="Satellite Raw" />
        <img src="../images/processed.png" alt="Processed" />
        <img src="../images/label.png" alt="Label" style={{maxWidth:'120px'}}/>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <img src="../images/csv.png" alt="CSV data" style={{maxWidth:'400px'}} />
      </div>
    </div>
  );
};

export default Research;
