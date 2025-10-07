import { useState } from "react";
import "../styles/ReportDmg.css";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";

export default function ReportDmg() {
  const [formData, setFormData] = useState({
    description: "",
    location: "",
    severity: "",
    images: [],
  });

  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...files],
      }));
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...files],
      }));
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <>
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
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    className="form-input"
                    placeholder="Enter the location of the damage"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Severity */}
                <div className="form-group">
                  <label htmlFor="severity" className="form-label">
                    Severity Level
                  </label>
                  <select
                    id="severity"
                    name="severity"
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

                {/* Image Upload */}
                <div className="form-group">
                  <label className="form-label">Upload Images</label>
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
                            <span className="image-name">{file.name}</span>
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
                    className="submit-btn"
                  >
                    Submit Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      <Footer />
    </>
  );
}
