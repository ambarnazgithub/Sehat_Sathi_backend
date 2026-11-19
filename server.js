import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import healthRoutes from "./routes/health.routes.js";
import { connectDB } from "./config/db.js";

const app = express();

const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173"
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);

app.use(express.json());

// Serverless environment mein har request se pehle DB connection ensure karein
app.use(async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message
    });
  }
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Sehat Saathi API is running"
  });
});

app.use("/api/health", healthRoutes);

// Sirf local environment mein server listen karega, Vercel par export hoga
if (process.env.VERCEL !== "1") {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}

export default app;