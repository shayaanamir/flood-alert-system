import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "../styles/ReportDmg.css";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import { locationService } from "../services/locationService";

export default function ReportDmg() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    lat: null,
    long: null,
    severity: "",
    images: [],
  });

  const [reporterContact, setReporterContact] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });
  const [userId, setUserId] = useState(null);

  const API_URL = "http://localhost:5000/profile";

  // Fetch user information from token and profile
  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoadingProfile(false);
        return;
      }

      try {
        // Decode token to get user ID
        const decoded = jwtDecode(token);
        setUserId(decoded.id);

        // Fetch full profile information
        const response = await fetch(`${API_URL}/${decoded.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            setReporterContact({
              name: result.data.full_name || "",
              phone: result.data.phone || "",
              email: result.data.email || "",
            });
          }
        }
      } catch (err) {
        console.error("Error fetching user info:", err);
      } finally {
        setIsLoadingProfile(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setReporterContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Get current location using geolocation API
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setSubmitMessage({
        type: "error",
        text: "Geolocation is not supported by your browser",
      });
      return;
    }

    setIsGettingLocation(true);
    setSubmitMessage({ type: "", text: "" });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Get address from coordinates
          const address = await locationService.getLocationFromCoords(
            latitude,
            longitude
          );
          
          setFormData((prev) => ({
            ...prev,
            location: address,
            lat: latitude,
            long: longitude,
          }));
          
          setSubmitMessage({
            type: "success",
            text: "Location detected successfully!",
          });
        } catch (error) {
          console.error("Error getting address:", error);
          // Still set coordinates even if address fetch fails
          setFormData((prev) => ({
            ...prev,
            lat: latitude,
            long: longitude,
          }));
          
          setSubmitMessage({
            type: "error",
            text: "Location detected but couldn't fetch address. Please enter manually.",
          });
        } finally {
          setIsGettingLocation(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setIsGettingLocation(false);
        
        let errorMessage = "Unable to get your location. ";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += "Please enable location permissions.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += "Location information unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage += "Location request timed out.";
            break;
          default:
            errorMessage += "An unknown error occurred.";
        }
        
        setSubmitMessage({
          type: "error",
          text: errorMessage,
        });
      }
    );
  };

  // Get coordinates when location text is changed
  const handleLocationBlur = async () => {
    if (formData.location && (!formData.lat || !formData.long)) {
      try {
        const coords = await locationService.getCoordsFromLocation(
          formData.location
        );
        
        if (coords && coords.length > 0) {
          setFormData((prev) => ({
            ...prev,
            lat: coords[0].lat,
            long: coords[0].lon,
          }));
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      handleFiles(files);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  // Convert images to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFiles = async (files) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    
    if (imageFiles.length === 0) {
      setSubmitMessage({
        type: "error",
        text: "Please upload only image files",
      });
      return;
    }

    if (formData.images.length + imageFiles.length > 5) {
      setSubmitMessage({
        type: "error",
        text: "You can only upload up to 5 images",
      });
      return;
    }

    try {
      const base64Images = await Promise.all(
        imageFiles.map(async (file) => {
          const base64 = await convertToBase64(file);
          return {
            name: file.name,
            data: base64,
          };
        })
      );

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...base64Images],
      }));
    } catch (error) {
      console.error("Error converting images:", error);
      setSubmitMessage({
        type: "error",
        text: "Error processing images",
      });
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.description || !formData.location || !formData.severity) {
      setSubmitMessage({
        type: "error",
        text: "Please fill in all required fields",
      });
      return;
    }

    if (!reporterContact.name || !reporterContact.phone || !reporterContact.email) {
      setSubmitMessage({
        type: "error",
        text: "Please provide your contact information",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage({ type: "", text: "" });

    try {
      // Get coordinates if not already set
      let lat = formData.lat;
      let long = formData.long;

      if (!lat || !long) {
        try {
          const coords = await locationService.getCoordsFromLocation(
            formData.location
          );
          if (coords && coords.length > 0) {
            lat = coords[0].lat;
            long = coords[0].lon;
          }
        } catch (error) {
          console.error("Error fetching coordinates:", error);
          // Use default coordinates if fetch fails
          lat = 0;
          long = 0;
        }
      }

      const payload = {
        title: formData.title || "Flood Damage Report",
        description: formData.description,
        location: formData.location,
        lat: lat || 0,
        long: long || 0,
        severity: formData.severity,
        images: formData.images.map((img) => img.data), // Send base64 strings
        reporter_contact: {
          name: reporterContact.name,
          phone: reporterContact.phone,
          email: reporterContact.email,
        },
      };

      const response = await fetch("http://localhost:5000/damage-reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage({
          type: "success",
          text: "Damage report submitted successfully!",
        });
        
        // Reset form (but keep contact info)
        setFormData({
          title: "",
          description: "",
          location: "",
          lat: null,
          long: null,
          severity: "",
          images: [],
        });

        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitMessage({ type: "", text: "" });
        }, 5000);
      } else {
        setSubmitMessage({
          type: "error",
          text: result.message || "Failed to submit report",
        });
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      setSubmitMessage({
        type: "error",
        text: "An error occurred while submitting the report",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div
        className="report-dmg-container"
        style={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}
      >
        <div className="report-dmg-content">
          <div className="report-dmg-card">
            <div className="report-dmg-header">
              <h1 className="report-dmg-title">Report Flood Damage</h1>
              <p className="report-dmg-subtitle">
                Help us understand the flood damage in your area. Please
                provide as much detail as possible to help with our assessment
                and response efforts.
              </p>
            </div>

            <div className="report-dmg-form">
              {/* Title */}
              <div className="form-group">
                <label htmlFor="title" className="form-label">
                  Report Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form-input"
                  placeholder="e.g., Road Flooding on Main Street (Optional - defaults to 'Flood Damage Report')"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>

              {/* Damage Description */}
              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  Damage Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  required
                  className="form-textarea"
                  placeholder="Please describe the damage you've observed..."
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              {/* Location */}
              <div className="form-group">
                <label htmlFor="location" className="form-label">
                  Location *
                </label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    className="form-input"
                    placeholder="Enter the location of the damage"
                    value={formData.location}
                    onChange={handleInputChange}
                    onBlur={handleLocationBlur}
                    style={{ flex: 1 }}
                  />
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    disabled={isGettingLocation}
                    className="location-btn"
                    style={{
                      padding: "0.5rem 1rem",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      border: "none",
                      borderRadius: "0.375rem",
                      cursor: isGettingLocation ? "not-allowed" : "pointer",
                      opacity: isGettingLocation ? 0.6 : 1,
                      fontWeight: "500",
                      fontSize: "0.875rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {isGettingLocation ? "Getting..." : "Use Current"}
                  </button>
                </div>
                {formData.lat && formData.long && (
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "#6b7280",
                      marginTop: "0.25rem",
                    }}
                  >
                    Coordinates: {formData.lat.toFixed(6)}, {formData.long.toFixed(6)}
                  </p>
                )}
              </div>

              {/* Severity */}
              <div className="form-group">
                <label htmlFor="severity" className="form-label">
                  Severity Level *
                </label>
                <select
                  id="severity"
                  name="severity"
                  required
                  className="form-select"
                  value={formData.severity}
                  onChange={handleInputChange}
                >
                  <option value="">Select severity level</option>
                  <option value="low">Low - Minor damage</option>
                  <option value="medium">Medium - Moderate damage</option>
                  <option value="high">High - Significant damage</option>
                  <option value="critical">Critical - Severe damage</option>
                </select>
              </div>

              {/* Reporter Contact Information */}
              <div className="form-group">
                <label className="form-label">
                  Your Contact Information *
                  {isLoadingProfile && (
                    <span style={{ fontSize: "0.875rem", color: "#6b7280", marginLeft: "0.5rem" }}>
                      (Loading from profile...)
                    </span>
                  )}
                </label>
                <div style={{ display: "grid", gap: "1rem" }}>
                  <input
                    type="text"
                    name="name"
                    required
                    className="form-input"
                    placeholder="Your Name"
                    value={reporterContact.name}
                    onChange={handleContactChange}
                    disabled={isLoadingProfile}
                  />
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="form-input"
                    placeholder="Phone Number (e.g., +91-9876543210)"
                    value={reporterContact.phone}
                    onChange={handleContactChange}
                    disabled={isLoadingProfile}
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    className="form-input"
                    placeholder="Email Address"
                    value={reporterContact.email}
                    onChange={handleContactChange}
                    disabled={isLoadingProfile}
                  />
                </div>
                {!isLoadingProfile && !reporterContact.name && (
                  <p style={{ fontSize: "0.875rem", color: "#6b7280", marginTop: "0.5rem" }}>
                    Not logged in? Your contact information will be saved with this report only.
                  </p>
                )}
              </div>

              {/* Image Upload */}
              <div className="form-group">
                <label className="form-label">Upload Images (Optional)</label>
                <p className="upload-subtitle">
                  You can upload up to 5 images (JPG, PNG, GIF)
                </p>

                <div
                  className={`upload-zone ${
                    dragActive ? "upload-zone-active" : ""
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="upload-icon">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                      <polyline points="7,10 12,15 17,10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </div>
                  <div className="upload-text">
                    <p>
                      <span className="upload-link">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="upload-formats">PNG, JPG, GIF up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="upload-input"
                  />
                </div>

                {/* Selected Images */}
                {formData.images.length > 0 && (
                  <div className="selected-images">
                    <h4 className="selected-images-title">
                      Selected Images ({formData.images.length})
                    </h4>
                    <div className="images-grid">
                      {formData.images.map((file, index) => (
                        <div key={index} className="image-item">
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <img
                              src={file.data}
                              alt={file.name}
                              style={{
                                width: "40px",
                                height: "40px",
                                objectFit: "cover",
                                borderRadius: "0.25rem",
                              }}
                            />
                            <span className="image-name">{file.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="remove-btn"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Message */}
              {submitMessage.text && (
                <div
                  className={`submit-message ${
                    submitMessage.type === "success"
                      ? "submit-message-success"
                      : "submit-message-error"
                  }`}
                  style={{
                    padding: "1rem",
                    borderRadius: "0.5rem",
                    marginBottom: "1rem",
                    backgroundColor:
                      submitMessage.type === "success" ? "#d1fae5" : "#fee2e2",
                    color:
                      submitMessage.type === "success" ? "#065f46" : "#991b1b",
                  }}
                >
                  {submitMessage.text}
                </div>
              )}

              {/* Important Notice */}
              <div className="notice-box">
                <div className="notice-content">
                  <div className="notice-icon">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </div>
                  <div className="notice-text">
                    <p className="notice-title">Important Notice</p>
                    <p className="notice-description">
                      This information will be used to coordinate emergency
                      response and recovery efforts. Please ensure all details
                      are accurate and complete.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="submit-section">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="submit-btn"
                  style={{
                    opacity: isSubmitting ? 0.6 : 1,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                  }}
                >
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}