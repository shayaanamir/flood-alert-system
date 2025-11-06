import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Header from '../components/global/Header';
import '../styles/ProfilePage.css';
import axios from 'axios';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchingLocation, setFetchingLocation] = useState(false);
  const [profile, setProfile] = useState({
    full_name: '',
    email: '',
    phone: '',
    location: ''
  });
  const [userId, setUserId] = useState(null);
  const API_URL = 'https://flood-alert-system-dkru.onrender.com/profile';
  const LOCATION_API_URL = 'https://flood-alert-system-dkru.onrender.com/location-conversion';

  useEffect(() => {
    // Get user ID from JWT token
    const token = localStorage.getItem('token');
    
    if (!token) {
      setError('Please login to view your profile');
      setLoading(false);
      return;
    }
    try {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    } catch (err) {
      setError('Invalid token. Please login again.');
      setLoading(false);
      localStorage.removeItem('token');
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_URL}/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Session expired. Please login again.');
        }
        throw new Error('Failed to fetch profile');
      }
      
      const result = await response.json();
      
      if (result.success) {
        setProfile({
          full_name: result.data.full_name || '',
          email: result.data.email || '',
          phone: result.data.phone || '',
          location: result.data.location || ''
        });
        setError(null);
      } else {
        throw new Error(result.message || 'Failed to fetch profile');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching profile:', err);
      
      if (err.message.includes('login')) {
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Function to get user's current location
  const handleGetMyLocation = async () => {
    setFetchingLocation(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setFetchingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          // Convert coordinates to address
          const res = await axios.get(
            `${LOCATION_API_URL}/location-from-coords?lat=${lat}&lon=${lon}`
          );
          setProfile(prev => ({
            ...prev,
            location: res.data.address
          }));
          setFetchingLocation(false);
        } catch (err) {
          console.error('Error fetching location:', err);
          setError('Failed to fetch location address');
          setFetchingLocation(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        setError('Unable to retrieve your location. Please enter manually.');
        setFetchingLocation(false);
      }
    );
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_URL}/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          full_name: profile.full_name,
          email: profile.email,
          phone: profile.phone,
          location: profile.location
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        if (response.status === 401) {
          throw new Error('Session expired. Please login again.');
        }
        throw new Error(result.message || 'Failed to update profile');
      }

      setProfile({
        full_name: result.data.full_name || '',
        email: result.data.email || '',
        phone: result.data.phone || '',
        location: result.data.location || ''
      });
      
      setIsEditing(false);
      setError(null);
      alert('Profile updated successfully!');
    } catch (err) {
      setError(err.message);
      console.error('Error updating profile:', err);
      alert(`Failed to update profile: ${err.message}`);
      
      if (err.message.includes('login')) {
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    fetchProfile(); // Reset to original values
  };

  if (loading && !profile.full_name) {
    return (
      <>
        <Header />
        <div className="profile-page-container">
          <div className="profile-page-content">
            <p>Loading profile...</p>
          </div>
        </div>
      </>
    );
  }

  if (error && !userId) {
    return (
      <>
        <Header />
        <div className="profile-page-container">
          <div className="profile-page-content">
            <div className="profile-page-error">
              <p>{error}</p>
              <p>Redirecting to login...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

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
              disabled={loading}
            >
              Edit Profile
            </button>
          ) : (
            <div className="profile-page-btn-group">
              <button 
                className="profile-page-btn profile-page-btn-secondary"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                className="profile-page-btn profile-page-btn-primary"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="profile-page-error">
            <p>Error: {error}</p>
          </div>
        )}

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
                        name="full_name"
                        value={profile.full_name}
                        onChange={handleInputChange}
                        className="profile-page-input"
                        required
                      />
                    ) : (
                      <p className="profile-page-value">{profile.full_name}</p>
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
                        required
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
                      <p className="profile-page-value">{profile.phone || 'Not provided'}</p>
                    )}
                  </div>

                  <div className="profile-page-form-group">
                    <label className="profile-page-label">Location</label>
                    {isEditing ? (
                      <div className="profile-location-input-wrapper">
                        <input
                          type="text"
                          name="location"
                          value={profile.location}
                          onChange={handleInputChange}
                          className="profile-page-input"
                          placeholder="Enter your location"
                        />
                        <button
                          type="button"
                          className="profile-get-location-button"
                          onClick={handleGetMyLocation}
                          disabled={fetchingLocation}
                          title="Get my current location"
                        >
                          {fetchingLocation ? (
                            <svg className="spinner" viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="32" strokeDashoffset="32">
                                <animate attributeName="stroke-dashoffset" dur="1s" repeatCount="indefinite" from="32" to="0" />
                              </circle>
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                          )}
                        </button>
                      </div>
                    ) : (
                      <p className="profile-page-value">{profile.location || 'Not provided'}</p>
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