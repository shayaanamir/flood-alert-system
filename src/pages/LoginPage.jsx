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

  const navigate = useNavigate();

  const demoUser = {
    email: "test@example.com",
    password: "Password123!",
  };

  function toggleStatus() {
    setIsLogin(!isLogin);
    setError("");
    setEmail("");
    setPassword("");
    setConfirmPass("");
  }

  function validateEmail(mail) {
    return /\S+@\S+\.\S+/.test(mail);
  }

  function handleSubmit(e) {
    e.preventDefault();
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
      // alert("✅ Account created successfully! (frontend only)");
      navigate("/");
    } else {
      // login flow
      if (email === demoUser.email && password === demoUser.password) {
        // alert("✅ Logged in successfully!");
        navigate("/");
      } else {
        setError("Invalid email or password.");
      }
    }
  }

  return (
    <>
      <div className="default login-container">
        <form className="default login-div" onSubmit={handleSubmit}>
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

          {error && <p className="error-message">{error}</p>}

          <div className="default login-button-div">
            <button type="submit" className="default login-button">
              {!isLogin ? "Login" : "Sign Up"}
            </button>
          </div>
          <div className="default login-footer">
            <p>
              {!isLogin ? "Don't have an account?" : "Already have an account?"}

              <button onClick={toggleStatus} className="status-button">
                {!isLogin ? "Sign Up" : "Log in"}
              </button>
            </p>
            <p>Remember Me</p>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
