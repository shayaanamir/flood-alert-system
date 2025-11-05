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

  const location = useLocation();
  useEffect(() => {
    if (location.state?.isSignUpPage !== undefined) {
      setIsSignUp(location.state.isSignUpPage);
    }
  }, [location.state]);

  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:5000/login-signup";

  // const demoUser = {
  //   email: "test@example.com",
  //   password: "user123",
  // };

  // const demoAdmin = {
  //   email: "admin@example.com",
  //   password: "admin123",
  // };

  function toggleStatus() {
    setIsSignUp(!isSignUp);
  }

  useEffect(() => {
    setError("");
    setEmail("");
    setPassword("");
    setConfirmPass("");
  }, [isSignUp]);

  function validateEmail(mail) {
    return /\S+@\S+\.\S+/.test(mail);
  }

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
          location,
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
        <form className="default login-div" onSubmit={handleSubmit}>
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
