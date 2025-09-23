import "../styles/AdminDashboard.css";

export default function QuickViews(props) {
  return (
    <>
      <div className="dashboard-default dashboard-quick-action">
        <div className="dashboard-default dashboard-quick-action-info">
          <span className="info-1">{props.info1}</span>
          <span className="info-2">{props.info2}</span>
          <span className="info-3">{props.info3}</span>
        </div>
        <div className="dashboard-default dashboard-quick-action-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="#2563EB"
            class="bi bi-exclamation-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
          </svg>
        </div>
      </div>
    </>
  );
}
