import "../styles/LoginPage.css";
import InputBlock from "../components/InputBlock";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const demoUser = {
    email: "test@example.com",
    password: "Password123!",
  };

  function toggleStatus() {
    setIsLogin(!isLogin);
  }

  useEffect(() => {
    setError("");
    setEmail("");
    setPassword("");
    setConfirmPass("");
  }, [isLogin]);

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

    if (isLogin) {
      // signup flow
      if (password !== confirmPass) {
        setError("Passwords do not match.");
        return;
      }
      navigate("/home");
    } else {
      if (email === demoUser.email && password === demoUser.password) {
        navigate("/home");
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
            <h1>{!isLogin ? "Welcome Back!" : "Create an Account"}</h1>
            <p>
              {!isLogin ? "Sign in " : "Sign up "}to access your flood alerts
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
          {isLogin && (
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
              {!isLogin ? "Login" : "Sign Up"}
            </button>
          </div>

          {error && submitted && <p className="error-message">{error}</p>}

          <div className="default login-footer">
            <p className="default">
              {!isLogin ? "Don't have an account?" : "Already have an account?"}
              &nbsp;
              <div onClick={toggleStatus} className="status-button">
                {!isLogin ? "Sign Up" : "Log in"}
              </div>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
