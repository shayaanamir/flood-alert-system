import "../styles/AdminDashboard.css";

export default function Labels(props) {
  return (
    <>
      <div className="dashboard-default dashboard-map-label">
        <div className="label-square"></div>
        {props.level}
      </div>
    </>
  );
}
