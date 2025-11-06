import { useState, useEffect } from "react";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import ShelterCard from "../components/ShelterCard";
import ShelterMap from "../components/ShelterMap";
import { shelterService } from "../services/shelterService";

export default function Shelters() {
  const [shelters, setShelters] = useState([]);
  const [filteredShelters, setFilteredShelters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAvailable, setFilterAvailable] = useState(false);
  const [filterPetFriendly, setFilterPetFriendly] = useState(false);
  const [filterAccessible, setFilterAccessible] = useState(false);
  const [selectedShelter, setSelectedShelter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          console.warn("Location access denied, using default location (Mumbai)", error);
          // Default to Mumbai
          setUserLocation({ lat: 19.0760, lon: 72.8777 });
        }
      );
    } else {
      console.warn("Geolocation not supported, using default location (Mumbai)");
      setUserLocation({ lat: 19.0760, lon: 72.8777 });
    }
  }, []);

  // Fetch shelters from database
  useEffect(() => {
    const fetchShelters = async () => {
      if (!userLocation) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch nearby shelters based on user location
        const response = await shelterService.getNearbyShelters(
          userLocation.lat,
          userLocation.lon,
          50 // 50km radius
        );

        if (response.success) {
          setShelters(response.data);
        } else {
          throw new Error(response.message || "Failed to fetch shelters");
        }
      } catch (err) {
        console.error("Error loading shelters:", err);
        setError("Failed to load shelters. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchShelters();
  }, [userLocation]);

  // Filter shelters based on search and filters
  useEffect(() => {
    let result = [...shelters];

    // Search filter
    if (searchTerm) {
      result = result.filter((shelter) =>
        shelter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shelter.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shelter.zone?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Available filter
    if (filterAvailable) {
      result = result.filter((shelter) => {
        const capacity = shelter.capacity?.current ?? 0;
        const maxCapacity = shelter.capacity?.max ?? 100;
        return capacity < maxCapacity && shelter.status !== 'Full';
      });
    }

    // Pet friendly filter
    if (filterPetFriendly) {
      result = result.filter((shelter) => shelter.pet_friendly === true);
    }

    // Accessible filter
    if (filterAccessible) {
      result = result.filter((shelter) => 
        shelter.accessibility === 'Full' || 
        shelter.accessibility === true ||
        shelter.facilities?.includes('Wheelchair Accessible')
      );
    }

    // Sort by distance (already sorted from API, but just in case)
    result.sort((a, b) => (a.distance_km || 0) - (b.distance_km || 0));

    setFilteredShelters(result);
  }, [shelters, searchTerm, filterAvailable, filterPetFriendly, filterAccessible]);

  const handleCall = (contact) => {
    const phone = contact.phone || contact;
    window.location.href = `tel:${phone}`;
  };

  const handleDirections = (address, lat, lon) => {
    const latitude = lat || userLocation?.lat;
    const longitude = lon || userLocation?.lon;
    
    if (latitude && longitude) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
      window.open(url, "_blank");
    } else {
      const url = `https://www.google.com/maps/search/${encodeURIComponent(address)}`;
      window.open(url, "_blank");
    }
  };

  const handleShelterSelect = (shelter) => {
    setSelectedShelter(shelter);
  };

  // Transform shelter data for ShelterCard compatibility
  const transformShelterForCard = (shelter) => ({
    ...shelter,
    currentOccupancy: shelter.capacity?.current ?? 0,
    capacity: shelter.capacity?.max ?? 100,
    contact: shelter.contact?.phone || "N/A",
    distance: shelter.distance_km,
    amenities: shelter.facilities || [],
    status: getShelterStatus(shelter),
    accessibility: shelter.accessibility === 'Full' || shelter.accessibility === true,
    petFriendly: shelter.pet_friendly === true,
    lat: shelter.latitude,
    lng: shelter.longitude,
  });

  const getShelterStatus = (shelter) => {
    const capacity = shelter.capacity?.current ?? 0;
    const maxCapacity = shelter.capacity?.max ?? 100;
    const occupancyRate = capacity / maxCapacity;

    if (shelter.status === 'Full' || occupancyRate >= 1) return 'full';
    if (shelter.status === 'Nearly Full' || occupancyRate >= 0.8) return 'nearly_full';
    return 'available';
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="shelters-page">
          <div className="shelters-container">
            <div className="shelters-header">
              <h1 className="page-title">Nearby Shelters</h1>
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <p>Loading shelters...</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="shelters-page">
          <div className="shelters-container">
            <div className="shelters-header">
              <h1 className="page-title">Nearby Shelters</h1>
              <div style={{ padding: '2rem', textAlign: 'center', color: '#ef4444' }}>
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

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
              {filteredShelters.map((shelter) => {
                const transformedShelter = transformShelterForCard(shelter);
                return (
                  <ShelterCard
                    key={shelter._id || shelter.id}
                    shelter={transformedShelter}
                    isSelected={selectedShelter?._id === shelter._id || selectedShelter?.id === shelter.id}
                    onSelect={() => handleShelterSelect(shelter)}
                    onCall={() => handleCall(shelter.contact)}
                    onDirections={() => handleDirections(shelter.address, shelter.latitude, shelter.longitude)}
                  />
                );
              })}

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
          <ShelterMap
            shelters={filteredShelters}
            selectedShelter={selectedShelter}
            onShelterSelect={handleShelterSelect}
            center={userLocation ? [userLocation.lat, userLocation.lon] : [19.0760, 72.8777]}
            zoom={12}
            height="500px"
          />
        </div>
      </div>
      <Footer />
    </>
  );
}