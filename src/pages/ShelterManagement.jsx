import Shelter from "../components/Shelter";
import ShelterDetails from "../components/ShelterDetails";
import ShelterSupply from "../components/ShelterSupply";
import { useEffect, useState } from "react";
import data from "../data_temp/sampleData.json";

export default function ShelterManagement(props) {
  const [searchShelterQuery, setSearchShelterQuery] = useState("");
  const [selectedShelter, setSelectedShelter] = useState(null);
  const [supplyModalShelter, setSupplyModalShelter] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredShelters = data.sheltersData.filter(
    (shelter) =>
      shelter.name.toLowerCase().includes(searchShelterQuery.toLowerCase()) ||
      shelter.zone.toLowerCase().includes(searchShelterQuery.toLowerCase())
  );

  return (
    <>
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
          {filteredShelters.map((shelter, index) => {
            const capacityPercentage =
              (shelter.capacity.current / shelter.capacity.max) * 100;
            return (
              <Shelter
                id={shelter.id}
                name={shelter.name}
                address={shelter.address.split(",")[0]}
                zone={shelter.zone}
                capacity={capacityPercentage}
                foodStatus={shelter.resources.food.status}
                medicalStatus={shelter.resources.medical.status}
                onDetailsClick={() => setSelectedShelter(shelter)}
                onSupplyClick={() => setSupplyModalShelter(shelter)}
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
