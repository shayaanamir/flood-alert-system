import { useState, useRef, useEffect } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import ShelterCard from "../components/ShelterCard";

export default function Shelters() {
  const [shelters, setShelters] = useState([
    {
      name: "Shelter A",
      address: "Bandra West, Mumbai",
      capacity: 100,
      currentOccupancy: 75,
      contact: "(000) 111-2222",
      distance: 0.8,
      amenities: ["Food", "Medical", "Bedding"],
      status: "available",
      accessibility: true,
      petFriendly: false,
      lat: 19.0596,
      lng: 72.8295,
    },
    {
      name: "Shelter B",
      address: "Worli, Mumbai",
      capacity: 150,
      currentOccupancy: 120,
      contact: "(000) 333-4444",
      distance: 1.2,
      amenities: ["Food", "Showers", "Pet Friendly"],
      status: "nearly_full",
      accessibility: true,
      petFriendly: true,
      lat: 19.0176,
      lng: 72.8181,
    },
    {
      name: "Shelter C",
      address: "Andheri East, Mumbai",
      capacity: 200,
      currentOccupancy: 180,
      contact: "(000) 555-6666",
      distance: 2.1,
      amenities: ["Food", "Clothing", "Counseling"],
      status: "nearly_full",
      accessibility: false,
      petFriendly: false,
      lat: 19.1136,
      lng: 72.8697,
    },
    {
      name: "Shelter D",
      address: "Dadar, Mumbai",
      capacity: 80,
      currentOccupancy: 80,
      contact: "(000) 777-8888",
      distance: 3.2,
      amenities: ["Medical", "Food", "Child Care"],
      status: "full",
      accessibility: true,
      petFriendly: false,
      lat: 19.0178,
      lng: 72.8478,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterAvailable, setFilterAvailable] = useState(false);
  const [filterPetFriendly, setFilterPetFriendly] = useState(false);
  const [filterAccessible, setFilterAccessible] = useState(false);
  const [selectedShelter, setSelectedShelter] = useState(null);

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  // Filter shelters BEFORE using in useEffect
  const filteredShelters = shelters
    .filter((shelter) => {
      const matchesSearch =
        shelter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shelter.address.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilters =
        (!filterAvailable || shelter.status === "available") &&
        (!filterPetFriendly || shelter.petFriendly) &&
        (!filterAccessible || shelter.accessibility);

      return matchesSearch && matchesFilters;
    })
    .sort((a, b) => a.distance - b.distance);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current).setView([19.0760, 72.8777], 12);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => map.remove();
  }, []);

  // Update markers
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    filteredShelters.forEach((shelter) => {
      // Create custom icon based on status
      const iconColor = 
        shelter.status === 'available' ? '#22c55e' : 
        shelter.status === 'nearly_full' ? '#f59e0b' : '#ef4444';

      const customIcon = L.divIcon({
        html: `<div style="
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: ${iconColor};
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        "></div>`,
        className: 'custom-shelter-marker',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });

      const marker = L.marker([shelter.lat, shelter.lng], { icon: customIcon })
        .addTo(mapInstanceRef.current)
        .bindPopup(`
          <div style="padding: 8px; min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">${shelter.name}</h3>
            <p style="margin: 4px 0; color: #64748b;">${shelter.address}</p>
            <p style="margin: 4px 0;"><strong>Capacity:</strong> ${shelter.currentOccupancy}/${shelter.capacity}</p>
            <p style="margin: 4px 0;"><strong>Distance:</strong> ${shelter.distance} km</p>
            <div style="margin-top: 8px;">
              <span style="
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: 600;
                background-color: ${shelter.status === 'available' ? '#dcfce7' : shelter.status === 'nearly_full' ? '#fef3c7' : '#fee2e2'};
                color: ${shelter.status === 'available' ? '#16a34a' : shelter.status === 'nearly_full' ? '#ca8a04' : '#dc2626'};
              ">
                ${shelter.status === 'available' ? 'Available' : shelter.status === 'nearly_full' ? 'Nearly Full' : 'Full'}
              </span>
            </div>
          </div>
        `);

      marker.on('click', () => setSelectedShelter(shelter));
      markersRef.current.push(marker);
    });

    if (filteredShelters.length > 0) {
      const bounds = L.latLngBounds(filteredShelters.map(s => [s.lat, s.lng]));
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [filteredShelters]);

  // Center map on selected shelter
  useEffect(() => {
    if (!selectedShelter || !mapInstanceRef.current) return;

    const shelterIndex = filteredShelters.findIndex(s => s === selectedShelter);
    if (shelterIndex !== -1 && markersRef.current[shelterIndex]) {
      const marker = markersRef.current[shelterIndex];
      marker.openPopup();
      mapInstanceRef.current.setView([selectedShelter.lat, selectedShelter.lng], 14);
    }
  }, [selectedShelter, filteredShelters]);

  const handleCall = (contact) => {
    window.location.href = `tel:${contact}`;
  };

  const handleDirections = (address) => {
    const url = `https://www.google.com/maps/search/${encodeURIComponent(address)}`;
    window.open(url, "_blank");
  };

  const handleShelterSelect = (shelter) => {
    setSelectedShelter(shelter);
  };

  return (
    <>
      <Header />
      <div className="shelters-page">
        <div className="shelters-container">
          {/* Left side - Shelter listings */}
          <div className="shelters-header">
            <h1 className="page-title">Nearby Shelters</h1>
            <p className="shelters-subtitle">
              Find safe locations near you during emergencies
            </p>

            <div className="emergency-info">
              <svg
                className="emergency-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
              <span>Emergency: Call 101 | Non-Emergency: (000) 999-0000</span>
            </div>

            {/* Search + Filters */}
            <div className="shelters-controls">
              <div className="search-section">
                <input
                  type="text"
                  placeholder="Search shelters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="filter-section">
                <h3>Filters:</h3>
                <div className="filter-options">
                  <label className="filter-option">
                    <input
                      type="checkbox"
                      checked={filterAvailable}
                      onChange={(e) => setFilterAvailable(e.target.checked)}
                    />
                    Available only
                  </label>
                  <label className="filter-option">
                    <input
                      type="checkbox"
                      checked={filterPetFriendly}
                      onChange={(e) => setFilterPetFriendly(e.target.checked)}
                    />
                    Pet friendly
                  </label>
                  <label className="filter-option">
                    <input
                      type="checkbox"
                      checked={filterAccessible}
                      onChange={(e) => setFilterAccessible(e.target.checked)}
                    />
                    Wheelchair accessible
                  </label>
                </div>
              </div>
            </div>

            {/* Shelter list */}
            <div className="shelters-list">
              {filteredShelters.map((shelter) => (
                <ShelterCard
                  key={shelter.name}
                  shelter={shelter}
                  isSelected={selectedShelter === shelter}
                  onSelect={handleShelterSelect}
                  onCall={handleCall}
                  onDirections={handleDirections}
                />
              ))}

              {filteredShelters.length === 0 && (
                <div className="no-results">
                  <span className="no-results-icon">⚠️</span>
                  <h3>No shelters found</h3>
                  <p>Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right side - Map */}
          <div className="shelters-map">
            <div className="map-header">
              <h2>Shelter Locations</h2>
              <div className="map-legend">
                <div className="legend-item">
                  <div className="legend-dot available"></div>
                  <span>Available</span>
                </div>
                <div className="legend-item">
                  <div className="legend-dot warning"></div>
                  <span>Nearly Full</span>
                </div>
                <div className="legend-item">
                  <div className="legend-dot full"></div>
                  <span>Full</span>
                </div>
              </div>
            </div>

            <div className="map-container">
              <div ref={mapRef} style={{ height: '500px', width: '100%' }}></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}