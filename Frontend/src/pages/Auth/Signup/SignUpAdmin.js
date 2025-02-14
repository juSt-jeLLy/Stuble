import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../../styles/SignUpStyles.css";
import AppContext from '../../../context/AppContext';

const SignUpAdmin = () => {
  const server = process.env.REACT_APP_SERVER;
  const { showAlert } = useContext(AppContext);
  const navigate = useNavigate();

  const [Admin, setAdmin] = useState({
    name: "", mobileno: "", email: "", password: "", cpassword: ""
  });

  const Adminsignup = async (e) => {
    e.preventDefault();
    if (Admin.password === Admin.cpassword) {
      try {
        const { data } = await axios.post(`${server}/SignUpAdmin`, {
          name: Admin.name,
          mobileno: Admin.mobileno,
          email: Admin.email,
          password: Admin.password,
        });
        if (data.success) {
          showAlert(data.msg, 'success');
          navigate('/LoginAdmin');
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
    setAdmin({ ...Admin, [name]: value });
  };

  return (
    <div className="signup-container">
      <h1>SignUp for Admin</h1>
      <form onSubmit={Adminsignup} method="post">
        <label>Name</label>
        <input
          type="text"
          required
          name="name"
          value={Admin.name}
          onChange={handleInput}
        />

        <label>Email</label>
        <input
          type="text"
          required
          name="email"
          value={Admin.email}
          onChange={handleInput}
        />

        <label>Phone no.</label>
        <input
          type="text"
          required
          name="mobileno"
          value={Admin.mobileno}
          onChange={handleInput}
        />

        <label>Password</label>
        <input
          type="password"
          required
          name="password"
          value={Admin.password}
          onChange={handleInput}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          required
          name="cpassword"
          value={Admin.cpassword}
          onChange={handleInput}
        />

        <input type="submit" value="Create account" className="create-account-btn" />

        <div className="signup-link">
          Already have an account? <a href="/LoginAdmin">Login</a>
        </div>
      </form>
    </div>
  );
};

export default SignUpAdmin;
