import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Header from '../components/global/Header';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState({
    full_name: '',
    email: '',
    phone: '',
    user_id: ''
  });
  const [userId, setUserId] = useState(null);

  const API_URL = 'http://localhost:5000/profile';

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
          user_id: result.data.user_id || ''
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
          phone: profile.phone
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
        user_id: result.data.user_id || ''
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
                    <label className="profile-page-label">User ID</label>
                    <p className="profile-page-value">{profile.user_id}</p>
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