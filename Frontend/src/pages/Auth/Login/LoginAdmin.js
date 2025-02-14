import React, { useContext, useState } from 'react';
import "../../../styles/LoginStyle.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../../context/AppContext.js';

const LoginAdmin = () => {
  const { showAlert, LoginA, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [Admin, setAdmin] = useState({
    email: "",
    password: ""
  });

  const Adminlogin = async (e) => {
    e.preventDefault();
    const server = process.env.REACT_APP_SERVER;
    try {
      const response = await axios.post(`${server}/LoginAdmin`, {
        email: Admin.email,
        password: Admin.password
      });
      if (response.data.success) {
        showAlert(response.data.message, 'success');
        setUser(response.data.data.name);
        LoginA('true');
        navigate('/AdminHome');
      } else {
        showAlert(response.data.message, 'danger');
      }
    } catch (error) {
      showAlert('Something went wrong!', 'danger');
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...Admin, [name]: value });
  };

  return (
    <div className="login-container">
      <h1>Login For Admin</h1>
      <form onSubmit={Adminlogin} method="post">
        <label>Admin email</label>
        <input
          type="text"
          required
          name="email"
          value={Admin.email}
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

        <a href="/Forget" style={{ fontSize: '0.9rem' }}>Forget Password?</a>

        <input type="submit" value="Login" className="login-submit" />

        <div style={{ marginTop: '1rem' }}>
          Not a member? <a href="/SignUpAdmin">Signup</a>
        </div>
      </form>
    </div>
  );
};

export default LoginAdmin;
