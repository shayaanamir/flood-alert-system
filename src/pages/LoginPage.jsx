import "../styles/LoginPage.css";
import InputBlock from "../components/InputBlock";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  function toggleStatus() {
    setIsLogin(!isLogin);
  }

  return (
    <>
      <div className="default container">
        {/* <div className="default header"></div> */}

        <div className="default login-div">
          {/* <div className="default top-section"></div> */}
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
          />
          <InputBlock
            title="Password"
            type="password"
            placeholder="Enter password"
          />
          {isLogin && (
            <InputBlock
              title="Re-Enter Password"
              type="password"
              placeholder="Re-Enter password"
            />
          )}

          <div className="default login-button-div">
            <Link className="default login-button" to="/">
              Login
            </Link>
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
        </div>
      </div>
    </>
  );
};

export default LoginPage;
