import React, { useState } from "react";
import "../styles/AdminDashboard.css";
import { Link } from "react-router-dom";
import Header from "./../components/global/Header";
import QuickViews from "../components/QuickViews";
import Labels from "../components/Labels";
import ForecastDay from "../components/ForecastDay";
import Shelter from "../components/Shelter";
import DamageReport from "../components/DamageReport";

export default function AdminDashboard(props) {
  return (
    <>
      <div className="dashboard-default dashboard-body">
        <div className="dashboard-default dashboard-header">
          <div className="dashboard-default dashboard-header-title">
            <span
              style={{ fontWeight: "600", fontSize: "1.4rem", color: "white" }}
            >
              Emergency Flood Management
            </span>
            <span
              style={{ fontWeight: "300", fontSize: "0.9rem", color: "white" }}
            >
              Last Updated: Today, 10:45 AM
            </span>
          </div>
          <div className="dashboard-default dashboard-header-buttons">
            <button
              className="dashboard-default dashboard-header-button"
              style={{ backgroundColor: "#EAB308" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-bell"
                viewBox="0 0 16 16"
              >
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
              </svg>
              Send Alerts
            </button>
            <button className=" dashboard-default dashboard-header-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
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
              Refresh Data
            </button>
          </div>
        </div>

        <div className="dashboard-default dashboard-quick-actions">
          <QuickViews
            info1="Current Risk Level"
            info2="Medium"
            info3="45% probability"
          />
          <QuickViews
            info1="Active Alerts"
            info2="3"
            info3="2 regions affected"
          />
          <QuickViews
            info1="People in Shelters"
            info2="247"
            info3="43% of capacity"
          />
          <QuickViews info1="Damage Reports" info2="28" info3="12 critical" />
        </div>

        <div className="dashboard-default dashboard-map-forecast">
          <div className="dashboard-default dashboard-map">
            <div className="dashboard-default dashboard-map-header">
              <div className="dashboard-default dasboard-map-title">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="#2563EB"
                  class="bi bi-map"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.5.5 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103M10 1.91l-4-.8v12.98l4 .8zm1 12.98 4-.8V1.11l-4 .8zm-6-.8V1.11l-4 .8v12.98z"
                  />
                </svg>
                Flood Risk Map
              </div>
              <div className="dashboard-default dasboard-map-icons">
                <div className="dashboard-default dasboard-map-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-stack"
                    viewBox="0 0 16 16"
                  >
                    <path d="m14.12 10.163 1.715.858c.22.11.22.424 0 .534L8.267 15.34a.6.6 0 0 1-.534 0L.165 11.555a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.66zM7.733.063a.6.6 0 0 1 .534 0l7.568 3.784a.3.3 0 0 1 0 .535L8.267 8.165a.6.6 0 0 1-.534 0L.165 4.382a.299.299 0 0 1 0-.535z" />
                    <path d="m14.12 6.576 1.715.858c.22.11.22.424 0 .534l-7.568 3.784a.6.6 0 0 1-.534 0L.165 7.968a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0z" />
                  </svg>
                </div>
                <div className="dashboard-default dasboard-map-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-funnel-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="dashboard-default dashboard-map-body"></div>
            <div className="dashboard-default dashboard-map-footer">
              <Labels level="High Risk" />
              <Labels level="Medium Risk" />
              <Labels level="Low Risk" />
              <Labels level="Shelter" />
              <Labels level="Damage Report" />
            </div>
          </div>

          <div className="dashboard-default dashboard-forecast">
            <div className="dashboard-default dashboard-forecast-header">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-bar-chart-fill"
                viewBox="0 0 16 16"
              >
                <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
              </svg>
              Weather Forecast
            </div>
            <div className="dashboard-default dashboard-forecast-body">
              <ForecastDay />
              <ForecastDay />
              <ForecastDay />
            </div>
            <div className="dashboard-default dashboard-forecast-graph"></div>
          </div>
        </div>

        <div className="dashboard-default dashboard-shelters">
          <div className="dashboard-default dashboard-shelters-header">
            <div className="dashboard-default dashboard-shelters-header-title">
              Shelter Management
            </div>
            <div className="dashboard-default dashboard-shelters-header-buttons">
              <input
                className="dashboard-default"
                type="text"
                placeholder="Search Shelters"
              ></input>
              <button className="dashboard-default">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-funnel-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z" />
                </svg>
                Filter
              </button>
            </div>
          </div>
          <div className="dashboard-default dashboard-shelters-body">
            <div className="dashboard-default dashboard-shelters-body-header">
              <span>Shelter</span>
              <span>Location</span>
              <span>Status</span>
              <span>Capacity</span>
              <span>Resources</span>
              <span>Actions</span>
            </div>
            <Shelter />
            <Shelter />
            <Shelter />
          </div>
        </div>

        <div className="dashboard-default dashboard-shelters">
          <div className="dashboard-default dashboard-shelters-header">
            <div className="dashboard-default dashboard-shelters-header-title">
              Shelter Management
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
            <DamageReport />
            <DamageReport />
            <DamageReport />
            <DamageReport />
            <DamageReport />
            <DamageReport />
          </div>
        </div>
      </div>
    </>
  );
}
