import Shelter from "../components/Shelter";
import ShelterDetails from "../components/ShelterDetails";
import ShelterSupply from "../components/ShelterSupply";
import { useEffect, useState } from "react";
import data from "../data_temp/sampleData.json";
import ManagementTemplate from "../components/MangementTemplate";
import QuickViews from "../components/QuickViews";
import useShelter from "../hooks/useShelter";

export default function ShelterManagement(props) {
  const [searchShelterQuery, setSearchShelterQuery] = useState("");
  const [selectedShelter, setSelectedShelter] = useState(null);
  const [supplyModalShelter, setSupplyModalShelter] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);

  const [zone, setZone] = useState(""); // user input for zone
  const { shelterData, loading, error } = useShelter(
    zone ? Number(zone) : null
  );

  const filteredShelters = data.sheltersData.filter(
    (shelter) =>
      shelter.name.toLowerCase().includes(searchShelterQuery.toLowerCase()) ||
      shelter.zone.toLowerCase().includes(searchShelterQuery.toLowerCase())
  );

  return (
    <>
      <div className="dashboard-default dashboard-shelters">
        <div className="dashboard-default dashboard-quicks">
          <QuickViews
            info1="Total Shelters Available"
            info2="257"
            status="Low"
            info3="10 Needing Attention"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-check-lg"
                viewBox="0 0 16 16"
              >
                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
              </svg>
            }
            popupText="This indicates the current likelihood of flooding in the area based on recent rainfall and terrain data."
          />
          <QuickViews
            info1="Close to Full"
            info2="156"
            status="High"
            info3="12 With Low Resources Alert"
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
          <QuickViews
            info1="Inactive Shelters"
            info2="4"
            status="Medium"
            info3="Multiple Alerts Received"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-ban"
                viewBox="0 0 16 16"
              >
                <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0" />
              </svg>
            }
            popupText="This indicates the current likelihood of flooding in the area based on recent rainfall and terrain data."
          />
        </div>
        <div className="dashboard-default dashboard-shelters-header">
          <input
            className="dashboard-default"
            type="number"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            placeholder="Search Shelters"
          />
          <button className="dashboard-default button-1">
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
            Filters
          </button>
          <button className="dashboard-default button-2">
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
        <div className="dashboard-default dashboard-shelters-body">
          <div className="dashboard-default dashboard-shelters-body-header">
            <span>Shelter</span>
            <span>Location</span>
            <span>Status</span>
            <span>Capacity</span>
            <span>Resources</span>
            <span>Actions</span>
          </div>
          {loading && <p>Loading...</p>}

          {error && <p style={{ color: "red" }}>{error}</p>}

          {!loading && !error && shelterData.length === 0 && (
            <p>No shelter data found.</p>
          )}
          {shelterData?.map((p) => {
            const capacityPercentage =
              (p.current_occupancy / p.max_occupancy) * 100;
            return (
              <Shelter
                id={p.id}
                name={p.name}
                address={p.location}
                zone={p.zone}
                capacity={capacityPercentage}
                foodStatus={p.resources.food.status}
                medicalStatus={p.resources.medical.status}
                onDetailsClick={() => setSelectedShelter(p)}
                onSupplyClick={() => setSupplyModalShelter(p)}
              />
            );
          })}
        </div>
        <ShelterDetails
          shelter={selectedShelter}
          onClose={() => setSelectedShelter(null)}
        />
        <ShelterSupply
          shelter={supplyModalShelter}
          onClose={() => setSupplyModalShelter(null)}
        />
      </div>
    </>
  );
}
