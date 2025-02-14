import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Navbar.css"; // Make sure the path matches your structure
import AppContext from "../../context/AppContext";

/**
 * Responsive Navbar Component:
 *  - Has a hamburger menu on smaller screens
 *  - Uses your existing context logic for login/logout
 *  - On mobile, the menu toggles open/closed
 */
function Navbar() {
  // Context values
  const {
    loggedinC,
    LoginC,
    loggedinF,
    LoginF,
    loggedinA,
    LoginA,
    user,
    setUser,
  } = useContext(AppContext);

  const navigate = useNavigate();

  // State for toggling mobile menu
  const [menuOpen, setMenuOpen] = useState(false);

  // Handlers
  const handleSignup = () => {
    navigate("/OptionSignup");
    setMenuOpen(false); // Close menu if open
  };

  const handleLogin = () => {
    navigate("/OptionLogin");
    setMenuOpen(false); // Close menu if open
  };

  const handleProfile = () => {
    navigate("/Profile");
    setMenuOpen(false);
  };

  const Logout = () => {
    // Reset context
    setUser(null);
    LoginC("false");
    LoginA("false");
    LoginF("false");
    navigate("/");
    setMenuOpen(false); // close menu
  };

  return (
    <div className="navbar-container">
      {/* LOGO Section */}
      <div className="navbar-logo">
        <img
          src="../images/v914-ning-21a.jpg"
          className="company-logo"
          alt="GreenHarvest Logo"
        />
        <strong className="Companyname">GreenHarvest</strong>
      </div>

      {/* HAMBURGER ICON (visible on mobile) */}
      <button
        className="navbar-hamburger"
        onClick={() => setMenuOpen((prevState) => !prevState)}
      >
        &#9776;
      </button>

      {/* NAVIGATION LINKS (desktop) / DROP-DOWN (mobile) */}
      <div className={`navbar-options ${menuOpen ? "open" : ""}`}>
        <span className="navbar-options-btn">
          {/* If the user is logged in as F, C, or A, direct to their Home pages; otherwise, home = "/" */}
          {loggedinF === "true" && <a href="/FarmerHome">Home</a>}
          {loggedinC === "true" && <a href="/CompanyHome">Home</a>}
          {loggedinA === "true" && <a href="/AdminHome">Home</a>}
          {loggedinA === "false" &&
            loggedinF === "false" &&
            loggedinC === "false" && <a href="/">Home</a>}
        </span>
        <span className="navbar-options-btn">
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>
        </span>
        <span className="navbar-options-btn">
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </span>

        {/* SIGNUP / LOGIN / LOGOUT SECTION */}
        <div className="signin btn" id="log-btn">
          {user ? (
            <>
              <button className="button-name" onClick={handleProfile}>
                {user}
              </button>
              <button className="button-name" onClick={Logout}>
                LogOut
              </button>
            </>
          ) : (
            <>
              <button className="button-name" onClick={handleSignup}>
                SignUp
              </button>
              <button className="button-name" onClick={handleLogin}>
                LogIn
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
