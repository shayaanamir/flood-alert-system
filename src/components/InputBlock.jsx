import "../styles/LoginPage.css";

export default function InputBlock(props) {
  return (
    <div className="default login-block">
      <div className="default login-block-title">{props.title}</div>
      <div className="default login-block-input-div">
        <input
          type={props.type || "text"}
          placeholder={props.placeholder || "Enter username"}
          className="default login-block-input"
        />
      </div>
    </div>
  );
}
