import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../../styles/SignUpStyles.css";
import AppContext from '../../../context/AppContext';

const SignUpFarmer = () => {
  const server = process.env.REACT_APP_SERVER;
  const { showAlert } = useContext(AppContext);

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    mobileno: "",
    email: "",
    password: "",
    cpassword: ""
  });

  const usersignup = async (e) => {
    e.preventDefault();
    if (user.password === user.cpassword) {
      try {
        const { data } = await axios.post(`${server}/SignUpFarmer`, {
          name: user.name,
          mobileno: user.mobileno,
          email: user.email,
          password: user.password,
        });
        if (data.success) {
          showAlert(data.message, 'success');
          navigate('/LoginFarmer');
        } else {
          showAlert(data.message, 'danger');
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
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="signup-container">
      <h1>SignUp for Farmer</h1>
      <form onSubmit={usersignup} method="post">
        <label>Name</label>
        <input
          type="text"
          required
          name="name"
          value={user.name}
          onChange={handleInput}
        />

        <label>Email</label>
        <input
          type="text"
          required
          name="email"
          value={user.email}
          onChange={handleInput}
        />

        <label>Phone no.</label>
        <input
          type="text"
          required
          name="mobileno"
          value={user.mobileno}
          onChange={handleInput}
        />

        <label>Password</label>
        <input
          type="password"
          required
          name="password"
          value={user.password}
          onChange={handleInput}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          required
          name="cpassword"
          value={user.cpassword}
          onChange={handleInput}
        />

        <input type="submit" value="Create account" className="create-account-btn" />

        <div className="signup-link">
          Already have an account? <a href="/LoginFarmer">Login</a>
        </div>
      </form>
    </div>
  );
};

export default SignUpFarmer;
