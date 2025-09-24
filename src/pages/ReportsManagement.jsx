import("../styles/ReportsManagement.css");
import AddressTableRow from "../components/AddressTableRow";

export default function ReportsManagement() {
  return (
    <>
      <div className="reports-default reports-body">
        <div className="reports-default reports-panel">
          <span>Admin Panel</span>
          <div className="reports-default reports-panel-option">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-journal-text"
              viewBox="0 0 16 16"
            >
              <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
              <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
              <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
            </svg>
            Reports Management
          </div>
          <div className="reports-default reports-panel-option">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-house-door"
              viewBox="0 0 16 16"
            >
              <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
            </svg>
            Shelter Management
          </div>
        </div>
        <div className="reports-default reports-content">
          <div className="reports-default reports-header">
            <span>Damage Reports Management</span>
            <button className="reports-default">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-download"
                viewBox="0 0 16 16"
              >
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
              </svg>
              Export Reports
            </button>
          </div>
          <div className="reports-default reports-container">
            <div className="reports-default reports-list">
              <div className="reports-default reports-list-header">
                <div className="reports-default reports-list-header-left">
                  <input
                    type="text"
                    placeholder="Search Reports"
                    className="reports-default"
                  ></input>
                </div>
                <div className="reports-default reports-list-header-mid">
                  <div class="dropdown-container">
                    <select id="statusDropdown" name="status">
                      <option value="" disabled selected>
                        Status
                      </option>
                      <option value="all">All</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
                <div className="reports-default reports-list-header-right">
                  <div class="dropdown-container">
                    <select id="statusDropdown" name="status">
                      <option value="" disabled selected>
                        All Levels
                      </option>
                      <option value="verified">Verified</option>
                      <option value="unverified">Unverified</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="reports-default reports-heading">
                <span>ID</span>
                <span>Location</span>
                <span>Date</span>
                <span>Damage Level</span>
                <span>Status</span>
                <span>Reported By</span>
                <span>Actions</span>
              </div>
              <div className="reports-default reports-content-body">
                <AddressTableRow />
                <AddressTableRow />
                <AddressTableRow />
                <AddressTableRow />
                <AddressTableRow />
                <AddressTableRow />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
