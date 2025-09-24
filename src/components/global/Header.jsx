import "../../styles/components/global/header.css";
import { useNavigate } from "react-router-dom";

const Header = (props) => {

  const navigate = useNavigate();
  return (
    <header className={props.loggedOut ? "header" : "header header-landing"}>
      <div className="header-container">
        <div className={props.loggedOut ? "logo" : "logo logo-landing"}>
          <img src="/icon.svg" height="45px" width="35px" className="logo" />
          <h4>FloodAlert</h4>
        </div>

        {props.loggedOut ? (
          <nav className="navigation">
            <a href="#" className="nav-link">
              Home
            </a>
            <a href="#" className="nav-link">
              About
            </a>
            <a href="#" className="nav-link">
              Contact
            </a>
            <a href="#" className="nav-link" onClick={() => {navigate("/login", {state : {isSignUpPage: false}})}}>
              Sign In
            </a>
            <button className="sign-up-btn" onClick={() => {navigate("/login", {state : {isSignUpPage: true}})}}>Sign Up</button>
          </nav>
        ) : (
          <nav className="navigation navigation-landing">
            <a href="#" className="nav-link nav-link-landing" onClick={() => {navigate("/home")}}>
              Home
            </a>
            <a href="#" className="nav-link nav-link-landing" onClick={() => {navigate("/view-risk")}}>
              View Risk
            </a>
            <a href="#" className="nav-link nav-link-landing" onClick={() => {navigate("/report-dmg")}}>
              Report Damage
            </a>
            <a href="#" className="nav-link nav-link-landing">
              Find Shelter
            </a>
            <a href="#" className="nav-link nav-link-landing">
              Help
            </a>
            <a href="#" className="nav-link nav-link-landing">
              About
            </a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50px"
              height="40px"
              fill="white"
              class="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                fill-rule="evenodd"
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
