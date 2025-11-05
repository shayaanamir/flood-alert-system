import React, { useState } from 'react';
import Header from '../components/global/Header';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    address: 'Mumbai, Maharashtra'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log('Profile saved:', profile);
  };

  return (
    <>
      <Header />
      <div className="profile-page-container">
        <div className="profile-page-header">
          <h1 className="profile-page-title">My Profile</h1>
          {!isEditing ? (
            <button 
              className="profile-page-btn profile-page-btn-primary"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          ) : (
            <div className="profile-page-btn-group">
              <button 
                className="profile-page-btn profile-page-btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button 
                className="profile-page-btn profile-page-btn-primary"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          )}
        </div>

        <div className="profile-page-content">
          <div className="profile-page-section">
            <div className="profile-page-layout">
              <div className="profile-page-avatar-section">
                <div className="profile-page-avatar">
                  <svg className="profile-page-avatar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                {isEditing && (
                  <button className="profile-page-change-photo">Change Photo</button>
                )}
              </div>

              <div className="profile-page-info">
              <h2 className="profile-page-section-title">Personal Information</h2>
              <div className="profile-page-form-grid">
                <div className="profile-page-form-group">
                  <label className="profile-page-label">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleInputChange}
                      className="profile-page-input"
                    />
                  ) : (
                    <p className="profile-page-value">{profile.name}</p>
                  )}
                </div>

                <div className="profile-page-form-group">
                  <label className="profile-page-label">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleInputChange}
                      className="profile-page-input"
                    />
                  ) : (
                    <p className="profile-page-value">{profile.email}</p>
                  )}
                </div>

                <div className="profile-page-form-group">
                  <label className="profile-page-label">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleInputChange}
                      className="profile-page-input"
                    />
                  ) : (
                    <p className="profile-page-value">{profile.phone}</p>
                  )}
                </div>

                <div className="profile-page-form-group">
                  <label className="profile-page-label">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={profile.address}
                      onChange={handleInputChange}
                      className="profile-page-input"
                    />
                  ) : (
                    <p className="profile-page-value">{profile.address}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default ProfilePage;