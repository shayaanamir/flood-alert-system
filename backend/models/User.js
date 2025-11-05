import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const connection = mongoose.connection; // use same connection
const AutoIncrement = AutoIncrementFactory(connection);

const userSchema = new mongoose.Schema({
  user_id: { type: Number, unique: true }, // auto-incremented
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  role: { type: String, default: "user" },
});

userSchema.pre("save", function (next) {
  this.updated_at = new Date();
  next();
});

userSchema.plugin(AutoIncrement, { inc_field: "user_id" });

export default mongoose.model("User", userSchema);
