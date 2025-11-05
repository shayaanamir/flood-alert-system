import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    enum: ['Critical', 'Moderate', 'Low'],
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Resolved', 'Pending'],
    default: 'Active'
  },
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  description: {
    type: String,
    default: ''
  },
  affectedArea: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for faster queries
alertSchema.index({ status: 1, severity: 1 });
alertSchema.index({ timestamp: -1 });

const Alert = mongoose.model('Alert', alertSchema);

export default Alert;