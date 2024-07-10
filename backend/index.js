import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";

dotenv.config(); // Initialize dotenv to load environment variables from .env file

const app = express();

// CORS middleware configuration
app.use(cors({
    origin: process.env.FRONTEND_URL, // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    allowedHeaders: ["Authorization", "Content-Type"] // Specify allowed headers
}));

app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies

app.use("/api", router); // Route requests to /api to the router

const PORT = process.env.PORT || 8080; // Use the port from environment variables or default to 8080

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log("Server is running on port " + PORT);
    });
});
