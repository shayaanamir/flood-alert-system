import axios from "axios";

const API_URL = "https://68e65b6c21dd31f22cc53de3.mockapi.io/api/users";

export const signup = async (req, res) => {
  console.log("Signup request body:", req.body);

  try {
    const { email, password } = req.body;

    // Fetch ALL users (MockAPI doesn't support query filtering)
    const response = await axios.get(API_URL);
    const allUsers = response.data;

    // Check if email already exists by filtering in code
    const existingUser = allUsers.find((user) => user.email === email);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user in MockAPI
    const newUserResponse = await axios.post(API_URL, {
      email,
      password,
    });

    console.log("MockAPI signup response:", newUserResponse.data);

    res
      .status(201)
      .json({ message: "Signup successful", user: newUserResponse.data });
  } catch (err) {
    console.error("Signup error:", err.response?.data || err.message);
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

// LOGIN CONTROLLER
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fetch ALL users and filter in code
    const response = await axios.get(API_URL);
    const allUsers = response.data;

    const user = allUsers.find((u) => u.email === email);

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({ message: "Login successful", user });
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
