import Shelter from "../components/shelters_admin_page/Shelter";
import ShelterDetails from "../components/shelters_admin_page/ShelterDetails";
import ShelterSupply from "../components/shelters_admin_page/ShelterSupply";
import { useEffect, useState, useMemo } from "react";
import data from "../data_temp/sampleData.json";
import ManagementTemplate from "../components/MangementTemplate";
import QuickViews from "../components/global/QuickViews";
import useShelter from "../hooks/useShelter";
import "../styles/ShelterManagement.css";

// Filter Dropdown Component
const FilterDropdown = ({ options, selected, onChange, onClose, title }) => (
  <div
    style={{
      position: "absolute",
      top: "100%",
      right: 0,
      marginTop: "4px",
      backgroundColor: "white",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      zIndex: 10,
      padding: "12px",
      minWidth: "180px",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "8px",
      }}
    >
      <span style={{ fontSize: "13px", fontWeight: "600" }}>{title}</span>
      <button
        onClick={onClose}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        ×
      </button>
    </div>
    {options?.map((opt) => (
      <label
        key={opt}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 4px",
          cursor: "pointer",
          fontSize: "13px",
        }}
      >
        <input
          type="checkbox"
          checked={selected.includes(opt)}
          onChange={() => onChange(opt)}
        />
        {opt}
      </label>
    ))}
  </div>
);

// Column Header Component
const ColumnHeader = ({
  label,
  sortField,
  onSort,
  sortConfig,
  filterField,
  filterOptions,
  filters,
  onFilter,
  openFilter,
  setOpenFilter,
}) => {
  const isSorted = sortConfig ? sortConfig.field === sortField : "";
  const hasFilter = filterField && filters[filterField]?.length > 0;

  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        position: "relative",
      }}
    >
      {label}
      {sortField && (
        <button
          onClick={() => onSort(sortField)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "2px",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            opacity={isSorted ? 1 : 0.3}
          >
            <path
              d={
                isSorted && sortConfig.direction === "asc"
                  ? "M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
                  : "m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"
              }
            />
          </svg>
        </button>
      )}
      {filterField && (
        <>
          <button
            onClick={() =>
              setOpenFilter(openFilter === filterField ? null : filterField)
            }
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "2px",
              color: hasFilter ? "#0066cc" : "inherit",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z" />
            </svg>
          </button>
          {openFilter === filterField && (
            <FilterDropdown
              options={filterOptions}
              selected={filters[filterField] || []}
              onChange={(val) => onFilter(filterField, val)}
              onClose={() => setOpenFilter(null)}
              title={`Filter ${label}`}
            />
          )}
        </>
      )}
    </span>
  );
};

export default function ShelterManagement(props) {
  const [selectedShelter, setSelectedShelter] = useState(null);
  const [supplyModalShelter, setSupplyModalShelter] = useState(null);
  const [zone, setZone] = useState("");
  const { shelterData, loading, error } = useShelter(zone ? zone : null);
  const [sortConfig, setSortConfig] = useState({
    field: null,
    direction: "asc",
  });
  const [filters, setFilters] = useState({
    zone: [],
    status: [],
    foodStatus: [],
    medicalStatus: [],
  });
  const [openFilter, setOpenFilter] = useState(null);

  // === 🧮 Compute statistics ===
  const totalShelters = shelterData.length;
  const fullShelters = shelterData.filter(
    (s) => s.capacity.current / s.capacity.max >= 0.9
  ).length;
  const lowResourceShelters = shelterData.filter((s) =>
    Object.values(s.resources).some((r) => r.status?.toLowerCase() === "low")
  ).length;
  const inactiveShelters = shelterData.filter(
    (s) => s.status.toLowerCase() === "inactive"
  ).length;

  // === 💡 Determine statuses dynamically ===
  const capacityStatus =
    fullShelters / totalShelters > 0.5
      ? "High"
      : fullShelters / totalShelters > 0.2
      ? "Medium"
      : "Low";

  const resourceStatus =
    lowResourceShelters > 5
      ? "Critical"
      : lowResourceShelters > 2
      ? "Medium"
      : "Good";

  const inactiveStatus = inactiveShelters > 0 ? "Medium" : "Good";

  useEffect(() => {
    console.log("Shelters: ", shelterData);
  }, []);

  const filterOptions = useMemo(
    () => ({
      zone: [...new Set(shelterData?.map((s) => s.zone))].sort(),
      status: ["Active", "Inactive"],
      foodStatus: [
        ...new Set(
          shelterData?.map((s) => s.resources?.food?.status).filter(Boolean)
        ),
      ].sort(),
      medicalStatus: [
        ...new Set(
          shelterData?.map((s) => s.resources?.medical?.status).filter(Boolean)
        ),
      ].sort(),
    }),
    [shelterData]
  );

  const handleSort = (field) => {
    setSortConfig((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleFilter = (field, value) => {
    setFilters((prev) => {
      const curr = prev[field] || [];
      return {
        ...prev,
        [field]: curr.includes(value)
          ? curr.filter((f) => f !== value)
          : [...curr, value],
      };
    });
  };

  const filteredAndSortedData = useMemo(() => {
    if (!shelterData) return [];
    let result = [...shelterData];

    // Apply filters
    if (filters.zone.length)
      result = result.filter((s) => filters.zone.includes(s.zone));
    if (filters.status.length)
      result = result.filter((s) =>
        filters.status.includes(s.status || "Active")
      );
    if (filters.foodStatus.length)
      result = result.filter((s) =>
        filters.foodStatus.includes(s.resources?.food?.status)
      );
    if (filters.medicalStatus.length)
      result = result.filter((s) =>
        filters.medicalStatus.includes(s.resources?.medical?.status)
      );

    // Apply sorting
    if (sortConfig.field) {
      result.sort((a, b) => {
        let aVal, bVal;
        if (sortConfig.field === "name") {
          aVal = a.name?.toLowerCase();
          bVal = b.name?.toLowerCase();
        } else if (sortConfig.field === "location") {
          aVal = a.address?.toLowerCase();
          bVal = b.address?.toLowerCase();
        } else if (sortConfig.field === "capacity") {
          aVal = (a.capacity?.current / a.capacity?.max) * 100;
          bVal = (b.capacity?.current / b.capacity?.max) * 100;
        }

        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return result;
  }, [shelterData, filters, sortConfig]);

  const activeFiltersCount = Object.values(filters).reduce(
    (acc, curr) => acc + (curr?.length || 0),
    0
  );

  return (
    <div className="dashboard-default dashboard-shelters">
      <div className="dashboard-default dashboard-quicks">
        <QuickViews
          info1="Total Shelters Available"
          info2={totalShelters}
          status={capacityStatus}
          info3={`${fullShelters} Currently Close to Full`}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-check-lg"
              viewBox="0 0 16 16"
            >
              <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
            </svg>
          }
          popupText="Shows how many shelters are currently operational."
        />

        <QuickViews
          info1="Shelters With Low Resources"
          info2={lowResourceShelters}
          status={resourceStatus}
          info3="Require Supply Restock"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-exclamation-triangle"
              viewBox="0 0 16 16"
            >
              <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
              <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
            </svg>
          }
          popupText="Shelters that have one or more low supply categories."
        />

        <QuickViews
          info1="Inactive Shelters"
          info2={inactiveShelters}
          status={inactiveStatus}
          info3="Under Maintenance or Closed"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-ban"
              viewBox="0 0 16 16"
            >
              <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0" />
            </svg>
          }
          popupText="Shows shelters that are currently not operational."
        />
      </div>

      <div className="dashboard-default dashboard-shelters-header">
        <input
          className="dashboard-default"
          type="text"
          value={zone}
          onChange={(e) => setZone(e.target.value)}
          placeholder="Search Shelters"
        />
        <button className="dashboard-default button-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-download"
            viewBox="0 0 16 16"
          >
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
          </svg>
          Export Reports
        </button>
      </div>

      {activeFiltersCount > 0 && (
        <div
          style={{
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexWrap: "wrap",
            backgroundColor: "#f8f9fa",
          }}
        >
          <span style={{ fontSize: "14px", color: "#6c757d" }}>
            Active filters:
          </span>
          {Object.entries(filters).map(([field, values]) =>
            values.map((val) => (
              <span
                key={`${field}-${val}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 10px",
                  backgroundColor: "#e7f3ff",
                  color: "#0066cc",
                  borderRadius: "20px",
                  fontSize: "13px",
                }}
              >
                {val}
                <button
                  onClick={() => handleFilter(field, val)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#0066cc",
                  }}
                >
                  ×
                </button>
              </span>
            ))
          )}
          <button
            onClick={() =>
              setFilters({
                zone: [],
                status: [],
                foodStatus: [],
                medicalStatus: [],
              })
            }
            style={{
              background: "none",
              border: "none",
              color: "#0066cc",
              fontSize: "13px",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Clear all
          </button>
        </div>
      )}

      <div className="dashboard-default dashboard-shelters-body">
        <div className="dashboard-default dashboard-shelters-body-header">
          <ColumnHeader
            label="Shelter"
            sortField="name"
            onSort={handleSort}
            sortConfig={sortConfig}
          />
          <ColumnHeader
            label="Location"
            sortField="location"
            onSort={handleSort}
            sortConfig={sortConfig}
            filterField="zone"
            filterOptions={filterOptions.zone}
            filters={filters}
            onFilter={handleFilter}
            openFilter={openFilter}
            setOpenFilter={setOpenFilter}
          />
          <ColumnHeader
            label="Status"
            filterField="status"
            filterOptions={filterOptions.status}
            filters={filters}
            onFilter={handleFilter}
            openFilter={openFilter}
            setOpenFilter={setOpenFilter}
          />
          <ColumnHeader
            label="Capacity"
            sortField="capacity"
            onSort={handleSort}
            sortConfig={sortConfig}
          />
          <ColumnHeader
            label="Resources"
            filterField="resources"
            filterOptions={[...filterOptions.foodStatus]}
            filters={{
              resources: [...(filters.foodStatus || [])],
            }}
            onFilter={(_, val) => {
              filterOptions.foodStatus.includes(val)
                ? handleFilter("foodStatus", val)
                : handleFilter("medicalStatus", val);
            }}
            openFilter={openFilter}
            setOpenFilter={setOpenFilter}
          />
          <span>Actions</span>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && filteredAndSortedData.length === 0 && (
          <p style={{ padding: "20px", textAlign: "center", color: "#6c757d" }}>
            {activeFiltersCount > 0
              ? "No shelters match your filters"
              : "No shelter data found."}
          </p>
        )}

        {filteredAndSortedData?.map((p) => (
          <Shelter
            key={p.id}
            id={p.id}
            name={p.name}
            status={p.status}
            address={p.address}
            zone={p.zone}
            capacity={(p.capacity.current / p.capacity.max) * 100}
            foodStatus={p.resources.food.status}
            medicalStatus={p.resources.medical.status}
            onDetailsClick={() => setSelectedShelter(p)}
            onSupplyClick={() => setSupplyModalShelter(p)}
          />
        ))}
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
  );
}
