import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  long: {
    type: Number,
    required: true,
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  reporter_contact: {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'resolved'],
    default: 'pending',
  },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  collection: 'reports'  // This explicitly sets the collection name to 'reports'
});

const Report = mongoose.model("Report", reportSchema);

export default Report;