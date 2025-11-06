import { useRef, useEffect } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function ShelterMap({ 
  shelters, 
  selectedShelter, 
  onShelterSelect,
  center = [19.0760, 72.8777],
  zoom = 12,
  height = '500px'
}) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView(center, zoom);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers when shelters change
  useEffect(() => {
    if (!mapInstanceRef.current || !shelters) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    shelters.forEach((shelter) => {
      const lat = shelter.latitude || shelter.lat;
      const lon = shelter.longitude || shelter.lng;
      
      if (!lat || !lon) return;

      // Determine status and color
      const capacity = shelter.capacity?.current ?? shelter.currentOccupancy ?? 0;
      const maxCapacity = shelter.capacity?.max ?? shelter.capacity ?? 100;
      const occupancyRate = capacity / maxCapacity;
      
      let status = shelter.status || 'available';
      if (status === 'Full' || occupancyRate >= 1) {
        status = 'full';
      } else if (status === 'Nearly Full' || occupancyRate >= 0.8) {
        status = 'nearly_full';
      } else {
        status = 'available';
      }

      const iconColor = 
        status === 'available' ? '#22c55e' : 
        status === 'nearly_full' ? '#f59e0b' : '#ef4444';

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

      const distance = shelter.distance_km 
        ? `${shelter.distance_km} km` 
        : shelter.distance 
        ? `${shelter.distance} km` 
        : 'N/A';

      const marker = L.marker([lat, lon], { icon: customIcon })
        .addTo(mapInstanceRef.current)
        .bindPopup(`
          <div style="padding: 8px; min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">${shelter.name}</h3>
            <p style="margin: 4px 0; color: #64748b;">${shelter.address}</p>
            <p style="margin: 4px 0;"><strong>Capacity:</strong> ${capacity}/${maxCapacity}</p>
            <p style="margin: 4px 0;"><strong>Distance:</strong> ${distance}</p>
            <div style="margin-top: 8px;">
              <span style="
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: 600;
                background-color: ${status === 'available' ? '#dcfce7' : status === 'nearly_full' ? '#fef3c7' : '#fee2e2'};
                color: ${status === 'available' ? '#16a34a' : status === 'nearly_full' ? '#ca8a04' : '#dc2626'};
              ">
                ${status === 'available' ? 'Available' : status === 'nearly_full' ? 'Nearly Full' : 'Full'}
              </span>
            </div>
          </div>
        `);

      marker.on('click', () => {
        if (onShelterSelect) onShelterSelect(shelter);
      });
      
      markersRef.current.push(marker);
    });

    // Fit bounds to show all markers
    if (shelters.length > 0) {
      const validCoords = shelters
        .map(s => [s.latitude || s.lat, s.longitude || s.lng])
        .filter(([lat, lon]) => lat && lon);
      
      if (validCoords.length > 0) {
        const bounds = L.latLngBounds(validCoords);
        mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [shelters, onShelterSelect]);

  // Center map on selected shelter
  useEffect(() => {
    if (!selectedShelter || !mapInstanceRef.current) return;

    const lat = selectedShelter.latitude || selectedShelter.lat;
    const lon = selectedShelter.longitude || selectedShelter.lng;
    
    if (!lat || !lon) return;

    const shelterIndex = shelters.findIndex(s => 
      (s.id || s._id) === (selectedShelter.id || selectedShelter._id)
    );
    
    if (shelterIndex !== -1 && markersRef.current[shelterIndex]) {
      const marker = markersRef.current[shelterIndex];
      marker.openPopup();
      mapInstanceRef.current.setView([lat, lon], 14);
    }
  }, [selectedShelter, shelters]);

  return (
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
        <div ref={mapRef} style={{ height, width: '100%' }}></div>
      </div>
    </div>
  );
}