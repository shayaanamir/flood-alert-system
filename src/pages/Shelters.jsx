import { useState } from "react";
import "../styles/Shelters.css";
import Header from '../components/global/Header';
import Footer from '../components/global/Footer';

export default function Shelters() {
    const [shelters, setShelters] = useState([
        {
            name : "Community Shelter A",
            address : "123 Main St, Cityville",
            capacity : 100,
            currentOccupancy : 75,
            contact : "(123) 456-7890"
        },
        {
            name : "Downtown Shelter B",
            address : "456 Elm St, Cityville",
            capacity : 150,
            currentOccupancy : 120,
            contact : "(987) 654-3210"
        },
        {
            name : "Eastside Shelter C",
            address : "789 Oak St, Cityville",
            capacity : 200,
            currentOccupancy : 180,
            contact : "(555) 123-4567"
        },

    ])

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


    return (
        <div className="shelters-page">
            <Header loggedOut={false} />
            <div className="shelters-container">
                <div className="shelters-header">
                <h1 className="page-title">Nearby Shelters</h1>
                <div className="shelters-list">
                    {shelters.map((shelter, index) => (
                        <div key={shelter.name} className="shelter-card">
                            <h2 className="shelters-name">{shelter.name}</h2>
                            <p className="shelters-address"><strong>Address:</strong> {shelter.address}</p>
                            <p className="shelters-capacity"><strong>Capacity:</strong> {shelter.capacity}</p>
                            <p className="shelters-occupancy"><strong>Current Occupancy:</strong> {shelter.currentOccupancy}</p>
                            <p className="shelters-contact"><strong>Contact:</strong> {shelter.contact}</p>
                        </div>
                    ))}
                </div>
             </div>
             <div className="shelters-info">
                <h2>What to Bring to a Shelter</h2>
                <ul>
                    <li>Personal identification (ID, driver's license, etc.)</li>
                    <li>Medications and medical records</li>
                    <li>Clothing and personal hygiene items</li>
                    <li>Important documents (insurance papers, bank information, etc.)</li>
                    <li>Food and water (if possible)</li>
                    <li>Comfort items (blanket, pillow, books, etc.)</li>
                </ul>
                <p>Please remember to follow all shelter rules and guidelines to ensure a safe and comfortable stay for everyone.</p>
            </div>

            </div>
            <Footer />
        </div>
    );
}
