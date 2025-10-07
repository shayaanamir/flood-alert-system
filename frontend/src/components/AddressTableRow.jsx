import React from "react";

const AddressTableRow = () => {
  return (
    <>
      <style>{`
        .table-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
          gap: 5px;
          padding: 10px 0px;
          width: 100%;
          align-items: center;
          background-color: white;
          border-bottom: 1px solid #e5e7eb;
          transition: background-color 0.2s ease;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .table-row:hover {
          background-color: #f9fafb;
        }


        .row-id {
          font-size: 14px;
          font-weight: 500;
          color: #111827;
        }

        .address-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .address-main {
          font-size: 14px;
          font-weight: 500;
          color: #111827;
        }

        .address-city {
          font-size: 14px;
          color: #6b7280;
        }

        .address-coords {
          font-size: 12px;
          color: #9ca3af;
        }

        .date {
          font-size: 14px;
          color: #111827;
        }

        .status-badges {
          display: flex;
          gap: 8px;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          padding: 2px 10px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 500;
          width: 70%;
        }

        .badge-severe {
          background-color: #ffdfdfff;
          color: #891818ff;
        }

        .badge-verified {
          background-color: #dcfbe5ff;
          color: #13562dff;
        }

        .person-name {
          font-size: 14px;
          color: #111827;
        }

        .actions {
          display: flex;
          gap: 8px;
          flex-direction: column;
        }

        .action-button {
          background: none;
          border: none;
          color: #2563eb;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 4px;
          transition: color 0.2s ease;
        }

        .action-button:hover {
          color: #1d4ed8;
          background-color: #eff6ff;
        }

        @media (max-width: 768px) {
          .table-row {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .left-section,
          .middle-section,
          .right-section {
            justify-content: flex-start;
          }

          .middle-section {
            justify-content: space-between;
          }

          .right-section {
            justify-content: space-between;
          }
        }
      `}</style>

      <div className="table-row">
        {/* Left Section - Row ID and Address */}

        <div className="row-id">R001</div>
        <div className="address-info">
          <div className="address-main">123 Main St.</div>
          <div className="address-city">Springfield</div>
          <div className="address-coords">40.7128° N, 74.0060° W</div>
        </div>

        {/* Middle Section - Date and Status */}

        <div className="date">2023-06-15</div>

        <div className="badge badge-severe">Severe</div>
        <div className="badge badge-verified">Verified</div>

        {/* Right Section - Name and Actions */}

        <div className="person-name">John Smith</div>
        <div className="actions">
          <button className="action-button">View</button>
          <button className="action-button">Verify</button>
        </div>
      </div>
    </>
  );
};

export default AddressTableRow;
