import "../styles/LoginPage.css";
import InputBlock from "../components/InputBlock";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [fullname, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [fetchingLocation, setFetchingLocation] = useState(false);

  const location = useLocation();
  useEffect(() => {
    if (location.state?.isSignUpPage !== undefined) {
      setIsSignUp(location.state.isSignUpPage);
    }
  }, [location.state]);

  const navigate = useNavigate();
  const API_BASE_URL = "https://flood-alert-system-dkru.onrender.com/login-signup";
  const LOCATION_API_URL = "https://flood-alert-system-dkru.onrender.com/location-conversion";

  function toggleStatus() {
    setIsSignUp(!isSignUp);
  }

  useEffect(() => {
    setError("");
    setEmail("");
    setPassword("");
    setConfirmPass("");
    setUserLocation("");
  }, [isSignUp]);

  function validateEmail(mail) {
    return /\S+@\S+\.\S+/.test(mail);
  }

  // Function to get user's current location
  const handleGetMyLocation = async () => {
    setFetchingLocation(true);
    setError("");

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setFetchingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          // Convert coordinates to address
          const res = await axios.get(
            `${LOCATION_API_URL}/location-from-coords?lat=${lat}&lon=${lon}`
          );
          setUserLocation(res.data.address);
          setFetchingLocation(false);
        } catch (err) {
          console.error("Error fetching location:", err);
          setError("Failed to fetch location address");
          setFetchingLocation(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setError("Unable to retrieve your location. Please enter manually.");
        setFetchingLocation(false);
      }
    );
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      if (isSignUp) {
        // --- SIGNUP flow ---
        if (password !== confirmPass) {
          setError("Passwords do not match.");
          return;
        }

        const res = await axios.post(`${API_BASE_URL}/signup`, {
          email,
          password,
          fullname,
          phone,
          location: userLocation,
        });

        if (res.status === 201 || res.status === 200) {
          alert("Signup successful! Please login.");
          setIsSignUp(false);
        }
      } else {
        // --- LOGIN flow ---
        const res = await axios.post(`${API_BASE_URL}/login`, {
          email,
          password,
        });

        if (res.status === 200) {
          const user = res.data.user;
          const token = res.data.token;
          localStorage.setItem("token", token);
          localStorage.setItem("userRole", user.role);
          console.log("data", user);

          // Example: redirect based on role
          if (user.role === "admin") navigate("/admin-dashboard");
          else navigate("/home");
        }
      }
    } catch (err) {
      console.error("Login/Signup Error:", err);

      if (err.response) {
        // Server responded with a non-2xx status code
        setError(
          `Server Error: ${err.response.status} - ${
            err.response.data?.message || JSON.stringify(err.response.data)
          }`
        );
      } else if (err.request) {
        // Request was made but no response received
        setError(
          "No response received from the server. It might be down or unreachable."
        );
      } else {
        // Something else happened while setting up the request
        setError(`Error: ${err.message}`);
      }
    }
  }

  return (
    <>
      <div className="default login-container">
        <form
          className={`default login-div ${isSignUp ? "" : "signup-div"}`}
          onSubmit={handleSubmit}
        >
          <img
            src="/icon.svg"
            height="56px"
            width="56px"
            className="login-svg"
          />
          <div className="default login-container-header">
            <h1>{isSignUp ? "Create an Account" : "Welcome Back!"}</h1>
            <p>
              {isSignUp ? "Sign up " : "Sign in "}to access your flood alerts
              and dashboard
            </p>
          </div>
          {isSignUp && (
            <InputBlock
              title="Enter Name"
              type="text"
              placeholder="Enter Name"
              value={fullname}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <InputBlock
            title="Email Address"
            type="text"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputBlock
            title="Password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isSignUp && (
            <InputBlock
              title="Re-Enter Password"
              type="password"
              placeholder="Re-Enter password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          )}

          {isSignUp && (
            <InputBlock
              title="Enter Phone No."
              type="text"
              placeholder="Enter Phone No."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          )}

          {isSignUp && (
            <div className="default signup-location-input-container">
              <InputBlock
                title="Location"
                type="text"
                placeholder="Enter your location"
                value={userLocation}
                onChange={(e) => setUserLocation(e.target.value)}
              />
              <button
                type="button"
                className="signup-get-location-button"
                onClick={handleGetMyLocation}
                disabled={fetchingLocation}
                title="Get my current location"
              >
                {fetchingLocation ? (
                  <svg className="signup-spinner" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="32"
                      strokeDashoffset="32"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        dur="1s"
                        repeatCount="indefinite"
                        from="32"
                        to="0"
                      />
                    </circle>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
          )}

          <div className="default login-sub-footer">
            <p>Remember Me</p>
            <p>Forgot Password?</p>
          </div>
          <div className="default login-button-div">
            <button type="submit" className="default login-button">
              {isSignUp ? "Sign Up" : "Login"}
            </button>
          </div>

          {error && submitted && <p className="error-message">{error}</p>}

          <div className="default login-footer">
            <div className="default">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              &nbsp;
              <div onClick={toggleStatus} className="status-button">
                {isSignUp ? "Log in" : "Sign Up"}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
