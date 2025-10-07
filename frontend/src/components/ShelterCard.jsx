import React from "react";
import "../styles/Shelters.css";

const ShelterCard = ({
  shelter,
  isSelected,
  onSelect,
  onCall,
  onDirections,
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "status-available";
      case "nearly_full":
        return "status-warning";
      case "full":
        return "status-full";
      default:
        return "status-available";
    }
  };

  const getCapacityPercentage = (current, total) => {
    return Math.round((current / total) * 100);
  };

  const getCapacityColor = (percentage) => {
    if (percentage < 70) return "#22c55e"; // Green
    if (percentage < 90) return "#f59e0b"; // Orange
    return "#ef4444"; // Red
  };

  const capacityPercentage = getCapacityPercentage(
    shelter.currentOccupancy,
    shelter.capacity
  );

  return (
    <div
      className={`shelter-card ${getStatusColor(shelter.status)} ${
        isSelected ? "selected" : ""
      }`}
      onClick={() => onSelect(shelter)}
    >
      <div className="shelter-card-header">
        <h2 className="shelters-name">{shelter.name}</h2>
        <span className="shelter-distance">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            fill="currentColor"
            class="bi bi-geo-alt-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
          </svg>{" "}
          {shelter.distance} km
        </span>
      </div>

      <p className="shelters-address">
        <strong>Address:</strong> {shelter.address}
      </p>

      <div className="capacity-info">
        <div className="capacity-text">
          <strong>Capacity:</strong> {shelter.currentOccupancy}/
          {shelter.capacity}
          <span className="capacity-percentage">({capacityPercentage}%)</span>
        </div>
        <div className="capacity-bar">
          <div
            className="capacity-fill"
            style={{
              width: `${capacityPercentage}%`,
              backgroundColor: getCapacityColor(capacityPercentage),
            }}
          ></div>
        </div>
      </div>

      <div className="shelter-status">
        <span className="status-indicator">
          {shelter.status === "available" && "Space Available"}
          {shelter.status === "nearly_full" && "Nearly Full"}
          {shelter.status === "full" && "At Capacity"}
        </span>
      </div>

      <div className="amenities-section">
        <strong>Amenities:</strong>
        <div className="amenities-list">
          {shelter.amenities.map((amenity, idx) => (
            <span key={idx} className="amenity-tag">
              {amenity}
            </span>
          ))}
        </div>
      </div>

      <div className="shelter-features">
        {shelter.accessibility && (
          <span className="feature accessible">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              fill="currentColor"
              class="bi bi-person-wheelchair"
              viewBox="0 0 16 16"
            >
              <path d="M12 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-.663 2.146a1.5 1.5 0 0 0-.47-2.115l-2.5-1.508a1.5 1.5 0 0 0-1.676.086l-2.329 1.75a.866.866 0 0 0 1.051 1.375L7.361 3.37l.922.71-2.038 2.445A4.73 4.73 0 0 0 2.628 7.67l1.064 1.065a3.25 3.25 0 0 1 4.574 4.574l1.064 1.063a4.73 4.73 0 0 0 1.09-3.998l1.043-.292-.187 2.991a.872.872 0 1 0 1.741.098l.206-4.121A1 1 0 0 0 12.224 8h-2.79zM3.023 9.48a3.25 3.25 0 0 0 4.496 4.496l1.077 1.077a4.75 4.75 0 0 1-6.65-6.65z" />
            </svg>{" "}
            Accessible
          </span>
        )}
        {shelter.petFriendly && (
          <span className="feature pet-friendly">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="13px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="M180-475q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm180-160q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm240 0q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm180 160q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM266-75q-45 0-75.5-34.5T160-191q0-52 35.5-91t70.5-77q29-31 50-67.5t50-68.5q22-26 51-43t63-17q34 0 63 16t51 42q28 32 49.5 69t50.5 69q35 38 70.5 77t35.5 91q0 47-30.5 81.5T694-75q-54 0-107-9t-107-9q-54 0-107 9t-107 9Z" />
            </svg>{" "}
            Pet Friendly
          </span>
        )}
      </div>

      <div className="shelter-actions">
        <button
          className="action-btn primary"
          onClick={(e) => {
            e.stopPropagation();
            onDirections(shelter.address);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="currentColor"
            class="bi bi-map-fill"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M16 .5a.5.5 0 0 0-.598-.49L10.5.99 5.598.01a.5.5 0 0 0-.196 0l-5 1A.5.5 0 0 0 0 1.5v14a.5.5 0 0 0 .598.49l4.902-.98 4.902.98a.5.5 0 0 0 .196 0l5-1A.5.5 0 0 0 16 14.5zM5 14.09V1.11l.5-.1.5.1v12.98l-.402-.08a.5.5 0 0 0-.196 0zm5 .8V1.91l.402.08a.5.5 0 0 0 .196 0L11 1.91v12.98l-.5.1z"
            />
          </svg>{" "}
          Directions
        </button>
        <button
          className="action-btn secondary"
          onClick={(e) => {
            e.stopPropagation();
            onCall(shelter.contact);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="currentColor"
            class="bi bi-telephone-fill"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
            />
          </svg>{" "}
          Call
        </button>
      </div>

      <p className="shelters-contact">
        <strong>Contact:</strong> {shelter.contact}
      </p>
    </div>
  );
};

export default ShelterCard;
