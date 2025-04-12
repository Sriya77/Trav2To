const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

// ✅ Enable CORS for frontend (Vite usually runs on port 5173)
app.use(cors({
  origin: "http://localhost:5173",
  // credentials: true
}));

app.use(express.json());

// ✅ Mongoose User Schema & Model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String
});

const User = mongoose.model("User", userSchema);

// ✅ Connect to MongoDB (no deprecation warnings now)
mongoose.connect("mongodb://localhost:27017/travelApp")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Signup Route
app.post("/signup", async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = new User({ name, email, phone, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
