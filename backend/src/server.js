import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoute.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database
console.log("Initializing database connection...");
connectDB();

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "Task Management API is running",
  });
});

// Task routes
app.use("/api/tasks", taskRoutes);

// Error handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);

  res.status(500).json({
    message: "Internal server error",
    error: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api/tasks`);
});