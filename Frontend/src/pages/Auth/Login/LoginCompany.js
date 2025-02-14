import React, { useContext, useState } from "react";
import "../../../styles/LoginStyle.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppContext from "../../../context/AppContext";

const LoginCompany = () => {
  const { showAlert, LoginC, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [Company, setCompany] = useState({
    email: "",
    password: "",
  });

  const Companylogin = async (e) => {
    e.preventDefault();
    const server = process.env.REACT_APP_SERVER;
    try {
      const response = await axios.post(`${server}/LoginCompany`, {
        email: Company.email,
        password: Company.password,
      });
      if (response.data.success) {
        showAlert(response.data.message, "success");
        setUser(response.data.data.name);
        LoginC("true");
        navigate("/CompanyHome");
      } else {
        showAlert(response.data.message, "danger");
      }
    } catch (error) {
      showAlert('Something went wrong!', 'danger');
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCompany({ ...Company, [name]: value });
  };

  return (
    <div className="login-container">
      <h1>Login For Buyer</h1>
      <form onSubmit={Companylogin} method="post">
        <label>Email</label>
        <input
          type="text"
          required
          name="email"
          value={Company.email}
          onChange={handleInput}
        />

        <label>Password</label>
        <input
          type="password"
          required
          name="password"
          value={Company.password}
          onChange={handleInput}
        />

        <a href="/Forget" style={{ fontSize: '0.9rem' }}>Forget Password?</a>

        <input type="submit" value="Login" className="login-submit" />

        <div style={{ marginTop: '1rem' }}>
          Not a member? <a href="/SignUpCompany">Signup</a>
        </div>
      </form>
    </div>
  );
};

export default LoginCompany;
