import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

//Signup

router.post("/signup", async (req, res) => {
  try {
    const { email, password, fullname, phone, location } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      full_name: fullname,
      email: email,
      password: hashedPass,
      phone: phone,
    });

    res
      .status(201)
      .json({ message: "User created successfully!", user: newUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
});

export default router;
