import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AppContext from "../context/AppContext";

const PrivateRoute = ({ component: Component, role }) => {
  const { loggedinC, loggedinF, loggedinA } = useContext(AppContext);
  console.log(role);
  console.log("Logged in states:", loggedinA, loggedinC, loggedinF);
  if (role === "farmer" && loggedinF == "true") {
    return <Component />;
  } else if (role === "company" && loggedinC == "true") {
    return <Component />;
  } else if (role === "admin" && loggedinA == "true") {
    return <Component />;
  } else {
    return <Navigate to="/OptionLogin" />;
  }
};

export default PrivateRoute;
