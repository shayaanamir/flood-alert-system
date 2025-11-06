import { useState, useRef, useEffect } from "react";
import "../../styles/components/global/header.css";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    navigate("/");
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    navigate("/profile");
  };

  return (
    <header className={props.loggedOut ? "header header-landing" : "header"}>
      <div className="header-container">
        <div className={props.loggedOut ? "logo logo-landing" : "logo"}>
          <img src="/icon.svg" height="45px" width="35px" className="logo-img" alt="FloodAlert Logo"/>
          <h4>FloodAlert</h4>
        </div>

        {props.loggedOut ? (
          <nav className="navigation">
            <a className="nav-link nav-link-landing" onClick={() => navigate("/")}>
              Home
            </a>
            <a className="nav-link nav-link-landing" onClick={() => navigate("/about")}>
              About
            </a>
            <a className="nav-link nav-link-landing" onClick={() => navigate("/contact")}>
              Contact
            </a>
            <a
              className="nav-link nav-link-landing"
              onClick={() => {
                navigate("/login", { state: { isSignUpPage: false } });
              }}
            >
              Sign In
            </a>
            <button
              className="sign-up-btn sign-up-btn-landing"
              onClick={() => {
                navigate("/login", { state: { isSignUpPage: true } });
              }}
            >
              Sign Up
            </button>
          </nav>
        ) : props.isAdmin ? (
          <nav className="navigation">
            <a
              className="nav-link"
              onClick={() => {
                navigate("/admin-dashboard");
              }}
            >
              Dashboard
            </a>
            <a
              className="nav-link"
              onClick={() => {
                navigate("/reports-management");
              }}
            >
              Reports
            </a>
            <div className="profile-dropdown-container" ref={dropdownRef}>
              <div 
                className="profile-icon-wrapper"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40px"
                  height="40px"
                  fill="white"
                  className="bi bi-person-circle profile-icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>
                <span className="profile-text">Admin</span>
              </div>
              {isDropdownOpen && (
                <div className="profile-dropdown">
                  <button className="dropdown-item" onClick={handleProfileClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                      <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                    </svg>
                    Profile
                  </button>
                  <button className="dropdown-item" onClick={handleLogout}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                      <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </nav>
        ) : (
          <nav className="navigation">
            <a
              className="nav-link"
              onClick={() => {
                navigate("/home");
              }}
            >
              Home
            </a>
            <a
              className="nav-link"
              onClick={() => {
                navigate("/view-risk");
              }}
            >
              View Risk
            </a>
            <a
              className="nav-link"
              onClick={() => {
                navigate("/report-dmg");
              }}
            >
              Report Damage
            </a>
            <a
              className="nav-link"
              onClick={() => {
                navigate("/shelters");
              }}
            >
              Find Shelter
            </a>
            <a className="nav-link" onClick={() => navigate("/help-guidelines")}>
              Help
            </a>
            <a className="nav-link" onClick={() => navigate("/about")}>
              About
            </a>
            <div className="profile-dropdown-container" ref={dropdownRef}>
              <div 
                className="profile-icon-wrapper"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40px"
                  height="40px"
                  fill="white"
                  className="bi bi-person-circle profile-icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>
              </div>
              {isDropdownOpen && (
                <div className="profile-dropdown">
                  <button className="dropdown-item" onClick={handleProfileClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                      <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                    </svg>
                    Profile
                  </button>
                  <button className="dropdown-item" onClick={handleLogout}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                      <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;