import "../styles/LoginPage.css";
import InputBlock from "../components/InputBlock";

const LoginPage = () => {
  return (
    <>
      <div className="default container">
        <div className="default header"></div>
        <div className="default login-body">
          <div className="default login-div">
            <div className="default top-section"></div>
            <div className="default login-container-header">
              <h1>Welcome Back</h1>
              <p>Sign in to access your flood alerts and dashboard</p>
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
            <div className="default login-button-div">
              <button className="default login-button">Login</button>
            </div>
            <div className="default login-footer">
              <p>Don't have an account? Sign Up</p>
              <p>Remember Me</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
