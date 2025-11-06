import React, { useEffect, useState } from "react";
import DamageDetails from "../components/reports_admin_page/DamageDetails";
import DamageRespond from "../components/reports_admin_page/DamageRespond";
import DamageReport from "../components/reports_admin_page/DamageReport";
import QuickViews from "../components/global/QuickViews";

export default function ReportsManagement() {
  const [reports, setReports] = useState([]); // fetched data
  const [searchReportsQuery, setSearchReportsQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [respondReport, setRespondReport] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch all damage reports from backend
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch("https://flood-alert-system-dkru.onrender.com/damage-reports");
        const data = await res.json();
        console.log("Fetched reports:", data); // 👈 Add this
        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  // 🔹 Filter reports by title, location, or severity
  const filteredReports = reports.data;

  useEffect(() => {
    console.log("reports fetched", reports);
  });

  return (
    <>
      <div className="reports-default dashboard-shelters">
        <div className="dashboard-default dashboard-quicks">
          <QuickViews
            info1="Total Reports"
            info2={reports.data ? reports.data.length : 0}
            status="Medium"
            info3="+12% From Last Month"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-exclamation-triangle"
                viewBox="0 0 16 16"
              >
                <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
                <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
              </svg>
            }
            popupText="This indicates the current likelihood of flooding in the area based on recent rainfall and terrain data."
          />
          {/* You can compute Verified/Pending counts later using report.status */}
        </div>

        <div className="dashboard-default dashboard-shelters-header">
          <input
            className="dashboard-default"
            type="text"
            placeholder="Search Reports"
            value={searchReportsQuery}
            onChange={(e) => setSearchReportsQuery(e.target.value)}
          />
        </div>

        <div className="dashboard-default dashboard-reports-body">
          {loading ? (
            <p>Loading reports...</p>
          ) : filteredReports.length === 0 ? (
            <p>No reports found.</p>
          ) : (
            filteredReports.map((report) => (
              <DamageReport
                key={report._id}
                report={report}
                onView={() => setSelectedReport(report)}
                onRespond={() => setRespondReport(report)}
              />
            ))
          )}
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
    </>
  );
}
