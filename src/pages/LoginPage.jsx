import "../styles/LoginPage.css";
import InputBlock from "../components/InputBlock";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const location = useLocation();
  useEffect(() => {
    if (location.state?.isSignUpPage !== undefined) {
      setIsSignUp(location.state.isSignUpPage);
    }
  }, [location.state]);

  const navigate = useNavigate();

  const demoUser = {
    email: "test@example.com",
    password: "user123",
  };

  const demoAdmin = {
    email: "admin@example.com",
    password: "admin123",
  };

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

  function handleSubmit(e) {
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

    if (isSignUp) {
      // signup flow
      if (password !== confirmPass) {
        setError("Passwords do not match.");
        return;
      }
      navigate("/home");
    } else {
      // login flow
      if (email === demoUser.email && password === demoUser.password) {
        navigate("/home");
      } else if (email === demoAdmin.email && password === demoAdmin.password) {
        navigate("/admin-dashboard");
      } else {
        setError("Invalid email or password.");
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
            <p className="default">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              &nbsp;
              <div onClick={toggleStatus} className="status-button">
                {isSignUp ? "Log in" : "Sign Up"}
              </div>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
