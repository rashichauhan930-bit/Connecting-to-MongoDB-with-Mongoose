// server.js
 
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
 
const userRoutes = require("./routes/users");
 
const app = express();
 
// Middleware
app.use(express.json());
 
// Routes
app.use("/api/users", userRoutes);
 
// Root route
app.get("/", (req, res) => {
    res.json({ message: "Day 4 CRUD API is running!" });
});
 
// Connect to MongoDB and start server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
        app.listen(process.env.PORT || 5000, () => {
            console.log("Server running on port 5000");
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error.message);
    });
    