import "../styles/LoginPage.css";

export default function InputBlock(props) {
  return (
    <div className="default login-block">
      <label className="default login-block-title">{props.title}</label>
      <div className="default login-block-input-div">
        <input
          type={props.type || "text"}
          placeholder={props.placeholder || "Enter username"}
          className="default login-block-input"
          value={props.value || ""}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}
