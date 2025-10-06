// import("../styles/ReportsManagement.css");
import AddressTableRow from "../components/AddressTableRow";
import Header from "./../components/global/Header";
import DamageDetails from "../components/DamageDetails";
import DamageRespond from "../components/DamageRespond";
import React, { useEffect, useState } from "react";
import data from "../data_temp/sampleData.json";
import DamageReport from "../components/DamageReport";

export default function ReportsManagement() {
  const [searchReportsQuery, setSearchReportsQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [respondReport, setRespondReport] = useState(null);

  const filteredReports = data.reportsData.filter(
    (report) =>
      report.title.toLowerCase().includes(searchReportsQuery.toLowerCase()) ||
      report.location
        .toLowerCase()
        .includes(searchReportsQuery.toLowerCase()) ||
      report.severity.toLowerCase().includes(searchReportsQuery.toLowerCase())
  );

  return (
    <>
      <div className="reports-default reports-body">
        {/* <Header isAdmin={true} /> */}
        <div className="dashboard-default dashboard-shelters">
          <div className="dashboard-default dashboard-shelters-header">
            <div className="dashboard-default dashboard-shelters-header-title">
              Reports Management
            </div>
            <div className="dashboard-default dashboard-shelters-header-buttons">
              <input
                className="dashboard-default"
                type="text"
                placeholder="Search Reports"
              ></input>
              <button className="dashboard-default">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-arrow-clockwise"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
                  />
                  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                </svg>
                Refresh
              </button>
            </div>
          </div>
          <div className="dashboard-default dashboard-reports-body">
            {filteredReports.map((report) => (
              <DamageReport
                report={report}
                onView={() => setSelectedReport(report)}
                onRespond={() => setRespondReport(report)}
              />
            ))}
          </div>
        </div>
        <DamageRespond
          report={respondReport}
          onClose={() => setRespondReport(null)}
        />
        <DamageDetails
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          onRespond={() => {
            setRespondReport(selectedReport);
            setSelectedReport(null);
          }}
        />
      </div>
    </>
  );
}
