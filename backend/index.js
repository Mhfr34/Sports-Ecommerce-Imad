import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";

// Initialize dotenv to load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to enable CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // Example fallback if FRONTEND_URL is not defined
    credentials: true,
  })
);

// Middleware to parse JSON requests
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

// Routes
app.use("/api", router);

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Connected to DB");
    console.log(`Server is running on port ${PORT}`);
  });
});
