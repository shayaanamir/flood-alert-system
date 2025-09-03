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
    // setError("");
    // setEmail("");
    // setPassword("");
    // setConfirmPass("");
    // setSubmitted(false);
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
          <svg
            width="56x"
            height="56px"
            viewBox="0 0 20 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 23.6667C12.166 23.6667 14.2432 22.8063 15.7747 21.2747C17.3063 19.7432 18.1667 17.6659 18.1667 15.5C18.1667 13.1667 17 10.95 14.6667 9.08333C12.3334 7.21667 10.5834 4.41667 10 1.5C9.41671 4.41667 7.66671 7.21667 5.33337 9.08333C3.00004 10.95 1.83337 13.1667 1.83337 15.5C1.83337 17.6659 2.69379 19.7432 4.22534 21.2747C5.75688 22.8063 7.83411 23.6667 10 23.6667Z"
              stroke="#2563EB"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
