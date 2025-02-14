import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../../styles/SignUpStyles.css";
import AppContext from '../../../context/AppContext';

const SignUpCompany = () => {
  const server = process.env.REACT_APP_SERVER;
  const { showAlert } = useContext(AppContext);
  const navigate = useNavigate();

  const [company, setCompany] = useState({
    name: "",
    mobileno: "",
    email: "",
    password: "",
    cpassword: ""
  });

  const Companysignup = async (e) => {
    e.preventDefault();
    if (company.password === company.cpassword) {
      try {
        const { data } = await axios.post(`${server}/SignUpCompany`, {
          name: company.name,
          mobileno: company.mobileno,
          email: company.email,
          password: company.password,
        });
        if (data.success) {
          showAlert(data.msg, 'success');
          navigate('/LoginCompany');
        } else {
          showAlert(data.msg, 'danger');
        }
      } catch (error) {
        showAlert('Something went wrong!', 'danger');
      }
    } else {
      alert("Password Not Matching");
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  };

  return (
    <div className="signup-container">
      <h1>SignUp for Buyer</h1>
      <form onSubmit={Companysignup} method="post">
        <label>Name</label>
        <input
          type="text"
          required
          name="name"
          value={company.name}
          onChange={handleInput}
        />

        <label>Email</label>
        <input
          type="text"
          required
          name="email"
          value={company.email}
          onChange={handleInput}
        />

        <label>Phone no.</label>
        <input
          type="text"
          required
          name="mobileno"
          value={company.mobileno}
          onChange={handleInput}
        />

        <label>Password</label>
        <input
          type="password"
          required
          name="password"
          value={company.password}
          onChange={handleInput}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          required
          name="cpassword"
          value={company.cpassword}
          onChange={handleInput}
        />

        <input type="submit" value="Create account" className="create-account-btn" />

        <div className="signup-link">
          Already have an account? <a href="/LoginCompany">Login</a>
        </div>
      </form>
    </div>
  );
};

export default SignUpCompany;
