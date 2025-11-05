import mongoose from "mongoose";

const resourceItemSchema = new mongoose.Schema({
  status: String,
  quantity: Number,
  unit: String,
});

const resourcesSchema = new mongoose.Schema({
  food: resourceItemSchema,
  medical: resourceItemSchema,
  water: resourceItemSchema,
  blankets: resourceItemSchema,
});

const contactSchema = new mongoose.Schema({
  manager: String,
  phone: String,
  email: String,
});

const demographicsSchema = new mongoose.Schema({
  adults: Number,
  children: Number,
  seniors: Number,
});

const shelterSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // e.g. SH-002
  name: { type: String, required: true },
  address: String,
  zone: String,
  status: String, // e.g. "Full"
  capacity: {
    current: Number,
    max: Number,
  },
  resources: resourcesSchema,
  contact: contactSchema,
  facilities: [String],
  openedDate: Date,
  lastUpdated: String, // stored as string (contains date + time)
  notes: String,
  occupancyTrend: [Number],
  demographics: demographicsSchema,
  pet_friendly: Boolean,
  latitude: Number,
  longitude: Number,
  accessibility: String,
});

// Automatically update `lastUpdated` timestamp before saving
shelterSchema.pre("save", function (next) {
  this.lastUpdated = new Date().toISOString();
  next();
});

export default mongoose.model("Shelter", shelterSchema, "shelter");
