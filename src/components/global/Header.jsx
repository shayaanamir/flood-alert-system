import "../../styles/components/global/header.css";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();
  return (
    <header className={props.loggedOut ? "header header-landing" : "header"}>
      <div className="header-container">
        <div className={props.loggedOut ? "logo logo-landing" : "logo"}>
          <img src="/icon.svg" height="45px" width="35px" className="logo-img" />
          <h4>FloodAlert</h4>
        </div>

        {props.loggedOut ? (
          <nav className="navigation">
            <a className="nav-link nav-link-landing">Home</a>
            <a className="nav-link nav-link-landing">About</a>
            <a className="nav-link nav-link-landing">Contact</a>
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
            <a className="nav-link">Settings</a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50px"
              height="40px"
              fill="white"
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                fillRule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
              />
            </svg>
            Admin
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
            <a className="nav-link">Help</a>
            <a className="nav-link">About</a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50px"
              height="40px"
              fill="white"
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                fillRule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
              />
            </svg>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;