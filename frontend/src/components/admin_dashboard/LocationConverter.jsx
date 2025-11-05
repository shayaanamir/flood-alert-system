// components/dashboard/LocationConverter.jsx
import React from "react";
import { ArrowLeftRight } from "lucide-react";

export const LocationConverter = ({
  mode,
  latitude,
  longitude,
  location,
  coordsResult,
  addressResult,
  loading,
  onLatChange,
  onLonChange,
  onLocationChange,
  onSwap,
  onConvert,
}) => {
  return (
    <div className="card">
      <div className="input-row">
        {/* Inputs */}
        <div className="inputs">
          {mode === "toLocation" ? (
            <>
              <input
                type="text"
                placeholder="Latitude"
                value={latitude}
                onChange={(e) => onLatChange(e.target.value)}
                className="input"
              />
              <input
                type="text"
                placeholder="Longitude"
                value={longitude}
                onChange={(e) => onLonChange(e.target.value)}
                className="input"
              />
            </>
          ) : (
            <input
              type="text"
              placeholder="Enter Location"
              value={location}
              onChange={(e) => onLocationChange(e.target.value)}
              className="input full-width"
            />
          )}
        </div>

        {/* Swap Button */}
        <button className="swap-btn" onClick={onSwap} title="Swap mode">
          <ArrowLeftRight />
        </button>

        {/* Convert Button */}
        <button className="convert-btn" onClick={onConvert} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Result */}
      {(coordsResult || addressResult) && (
        <div className="result-box">
          {coordsResult && (
            <p>
              Coordinates: {coordsResult.lat}, {coordsResult.lon}
            </p>
          )}
          {addressResult && <p>Address: {addressResult}</p>}
        </div>
      )}
    </div>
  );
};
