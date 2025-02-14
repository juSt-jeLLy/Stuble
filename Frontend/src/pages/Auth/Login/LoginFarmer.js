import React, { useContext, useState } from "react";
import "../../../styles/LoginStyle.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppContext from "../../../context/AppContext";

const LoginFarmer = () => {
  const { showAlert, LoginF, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [user1, setuser] = useState({
    email: "",
    password: "",
  });

  const userlogin = async (e) => {
    e.preventDefault();
    const server = process.env.REACT_APP_SERVER;
    try {
      const response = await axios.post(`${server}/LoginFarmer`, {
        email: user1.email,
        password: user1.password,
      });
      if (response.data.success) {
        showAlert(response.data.message, "success");
        setUser(response.data.data.name);
        LoginF("true");
        navigate("/FarmerHome");
      } else {
        showAlert(response.data.message, "danger");
      }
    } catch (error) {
      showAlert("Something went wrong!", "danger");
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setuser({ ...user1, [name]: value });
  };

  return (
    <div className="login-container">
      <h1>Login for Farmer</h1>
      <form onSubmit={userlogin} method="post">
        <label>Mobile or Email</label>
        <input
          type="text"
          required
          name="email"
          value={user1.email}
          onChange={handleInput}
        />

        <label>Password</label>
        <input
          type="password"
          required
          name="password"
          value={user1.password}
          onChange={handleInput}
        />

        <a href="/Forget" style={{ fontSize: '0.9rem' }}>Forget Password?</a>

        <input type="submit" value="Login" className="login-submit" />
        
        <div style={{ marginTop: '1rem' }}>
          Not a member? <a href="/SignUpFarmer">Signup</a>
        </div>
      </form>
    </div>
  );
};

export default LoginFarmer;
