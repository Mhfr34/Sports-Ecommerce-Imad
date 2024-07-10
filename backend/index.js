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
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use("/api", router);

// Middleware to parse JSON requests
app.use(express.json());

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("connected to DB");
    console.log(`Server is running on port ${PORT}`);
  });
});
