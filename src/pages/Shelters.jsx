import { useState } from "react";
import "../styles/Shelters.css";
import Header from '../components/global/Header';
import Footer from '../components/global/Footer';

export default function Shelters() {
    const [shelters, setShelters] = useState([
        {
            name: "Shelter A",
            address: "Address 101",
            capacity: 100,
            currentOccupancy: 75,
            contact: "(000) 111-2222",
            distance: 0.8,
            amenities: ['Food', 'Medical', 'Bedding'],
            status: 'available',
            accessibility: true,
            petFriendly: false,
            lat: 40.7128,
            lng: -74.0060
        },
        {
            name: "Shelter B",
            address: "Address 202",
            capacity: 150,
            currentOccupancy: 120,
            contact: "(000) 333-4444",
            distance: 1.2,
            amenities: ['Food', 'Showers', 'Pet Friendly'],
            status: 'nearly_full',
            accessibility: true,
            petFriendly: true,
            lat: 40.7589,
            lng: -73.9851
        },
        {
            name: "Shelter C",
            address: "Address 303",
            capacity: 200,
            currentOccupancy: 180,
            contact: "(000) 555-6666",
            distance: 2.1,
            amenities: ['Food', 'Clothing', 'Counseling'],
            status: 'nearly_full',
            accessibility: false,
            petFriendly: false,
            lat: 40.7282,
            lng: -73.7949
        },
        {
            name: "Shelter D",
            address: "Address 404",
            capacity: 80,
            currentOccupancy: 80,
            contact: "(000) 777-8888",
            distance: 3.2,
            amenities: ['Medical', 'Food', 'Child Care'],
            status: 'full',
            accessibility: true,
            petFriendly: false,
            lat: 40.8176,
            lng: -73.9782
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterAvailable, setFilterAvailable] = useState(false);
    const [filterPetFriendly, setFilterPetFriendly] = useState(false);
    const [filterAccessible, setFilterAccessible] = useState(false);
    const [selectedShelter, setSelectedShelter] = useState(null);

    const getStatusColor = (status) => {
        switch(status) {
            case 'available': return 'status-available';
            case 'nearly_full': return 'status-warning';
            case 'full': return 'status-full';
            default: return 'status-available';
        }
    };

    const getCapacityPercentage = (current, total) => {
        return Math.round((current / total) * 100);
    };

    const getCapacityColor = (percentage) => {
        if (percentage < 70) return '#22c55e'; // Green
        if (percentage < 90) return '#f59e0b'; // Orange
        return '#ef4444'; // Red
    };

    const filteredShelters = shelters.filter(shelter => {
        const matchesSearch = shelter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             shelter.address.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesFilters = 
            (!filterAvailable || shelter.status === 'available') &&
            (!filterPetFriendly || shelter.petFriendly) &&
            (!filterAccessible || shelter.accessibility);

        return matchesSearch && matchesFilters;
    }).sort((a, b) => a.distance - b.distance);

    const handleCall = (contact) => {
        window.location.href = `tel:${contact}`;
    };

    const handleDirections = (address) => {
        const url = `https://www.google.com/maps/search/${encodeURIComponent(address)}`;
        window.open(url, '_blank');
    };

    return (
        <>
        <Header />
        <div className="shelters-page">
            <div className="shelters-container">
                {/* Left side - Shelter listings */}
                <div className="shelters-header">
                    <h1 className="page-title">Nearby Shelters</h1>
                    <p className="shelters-subtitle">Find safe locations near you during emergencies</p>
                    
                    <div className="emergency-info">
                        <span className="emergency-icon">⚠️</span>
                        <span>Emergency: Call 101 | Non-Emergency: (000) 999-0000</span>
                    </div>

                    {/* Search + Filters */}
                    <div className="shelters-controls">
                        <div className="search-section">
                            <input
                                type="text"
                                placeholder="🔍 Search shelters..."
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
                            <div 
                                key={shelter.name} 
                                className={`shelter-card ${getStatusColor(shelter.status)} ${selectedShelter === shelter ? 'selected' : ''}`}
                                onClick={() => setSelectedShelter(shelter)}
                            >
                                <div className="shelter-card-header">
                                    <h2 className="shelters-name">{shelter.name}</h2>
                                    <span className="shelter-distance">📍 {shelter.distance} mi</span>
                                </div>
                                
                                <p className="shelters-address">
                                    <strong>Address:</strong> {shelter.address}
                                </p>

                                <div className="capacity-info">
                                    <div className="capacity-text">
                                        <strong>Capacity:</strong> {shelter.currentOccupancy}/{shelter.capacity} 
                                        <span className="capacity-percentage">
                                            ({getCapacityPercentage(shelter.currentOccupancy, shelter.capacity)}%)
                                        </span>
                                    </div>
                                    <div className="capacity-bar">
                                        <div 
                                            className="capacity-fill"
                                            style={{ 
                                                width: `${getCapacityPercentage(shelter.currentOccupancy, shelter.capacity)}%`,
                                                backgroundColor: getCapacityColor(getCapacityPercentage(shelter.currentOccupancy, shelter.capacity))
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="shelter-status">
                                    <span className="status-indicator">
                                        {shelter.status === 'available' && '✅ Space Available'}
                                        {shelter.status === 'nearly_full' && '⚠️ Nearly Full'}
                                        {shelter.status === 'full' && '❌ At Capacity'}
                                    </span>
                                </div>

                                <div className="amenities-section">
                                    <strong>Amenities:</strong>
                                    <div className="amenities-list">
                                        {shelter.amenities.map((amenity, idx) => (
                                            <span key={idx} className="amenity-tag">{amenity}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="shelter-features">
                                    {shelter.accessibility && <span className="feature accessible">♿ Accessible</span>}
                                    {shelter.petFriendly && <span className="feature pet-friendly">🐕 Pet Friendly</span>}
                                </div>

                                <div className="shelter-actions">
                                    <button 
                                        className="action-btn primary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDirections(shelter.address);
                                        }}
                                    >
                                        🗺️ Directions
                                    </button>
                                    <button 
                                        className="action-btn secondary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCall(shelter.contact);
                                        }}
                                    >
                                        📞 Call
                                    </button>
                                </div>

                                <p className="shelters-contact">
                                    <strong>Contact:</strong> {shelter.contact}
                                </p>
                            </div>
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
                        <div className="map-placeholder">
                            {/* Grid lines */}
                            <div className="map-grid">
                                {Array.from({length: 20}).map((_, i) => (
                                    <div key={`v-${i}`} className="grid-line vertical" style={{left: `${i * 5}%`}}></div>
                                ))}
                                {Array.from({length: 15}).map((_, i) => (
                                    <div key={`h-${i}`} className="grid-line horizontal" style={{top: `${i * 6.67}%`}}></div>
                                ))}
                            </div>
                            
                            {/* Shelter markers */}
                            {filteredShelters.map((shelter, index) => (
                                <div
                                    key={shelter.name}
                                    className={`shelter-marker ${shelter.status} ${selectedShelter === shelter ? 'selected' : ''}`}
                                    style={{
                                        top: `${20 + (index * 15)}%`,
                                        left: `${30 + (index * 20)}%`
                                    }}
                                    onClick={() => setSelectedShelter(shelter)}
                                >
                                    <div className="marker-icon">📍</div>
                                    <div className="marker-label">{shelter.name}</div>
                                </div>
                            ))}
                            
                            {/* Selected shelter info */}
                            {selectedShelter && (
                                <div className="selected-shelter-info">
                                    <h3>{selectedShelter.name}</h3>
                                    <p>{selectedShelter.address}</p>
                                    <p>Distance: {selectedShelter.distance} mi</p>
                                    <p>Capacity: {selectedShelter.currentOccupancy}/{selectedShelter.capacity}</p>
                                    <div className="info-actions">
                                        <button 
                                            className="info-btn"
                                            onClick={() => handleDirections(selectedShelter.address)}
                                        >
                                            Directions
                                        </button>
                                        <button 
                                            className="info-btn"
                                            onClick={() => handleCall(selectedShelter.contact)}
                                        >
                                            Call
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}
