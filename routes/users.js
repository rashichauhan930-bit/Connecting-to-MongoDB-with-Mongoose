// routes/users.js — Complete CRUD routes file
 
const express = require("express");
const router = express.Router();
const User = require("../models/User");
 
// ─── CREATE ───────────────────────────────────────────────
// POST /api/users
router.post("/", async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(201).json({
            message: "User created successfully",
            user: savedUser
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
 
// ─── READ ALL ─────────────────────────────────────────────
// GET /api/users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            count: users.length,
            users: users
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
 
// ─── READ ONE ─────────────────────────────────────────────
// GET /api/users/:id
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ user: user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
 
// ─── UPDATE ───────────────────────────────────────────────
// PATCH /api/users/:id
router.patch("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({
            message: "User updated successfully",
            user: user
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
 
// ─── DELETE ───────────────────────────────────────────────
// DELETE /api/users/:id
router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({
            message: "User deleted successfully",
            deletedUser: user
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
 
module.exports = router;
    // GET /api/users?name=raju&minAge=18&sort=name
 
router.get("/", async (req, res) => {
    try {
        const { name, minAge, sort } = req.query;
 
        // Build filter object dynamically
        let filter = {};
 
        if (name) {
            // Case-insensitive search using regex
            filter.name = { $regex: name, $options: "i" };
        }
 
        if (minAge) {
            filter.age = { $gte: Number(minAge) };
        }
 
        // Build sort object
        let sortOption = {};
        if (sort) {
            sortOption[sort] = 1;
        } else {
            sortOption.createdAt = -1;  // default: newest first
        }
 
        const users = await User.find(filter).sort(sortOption);
 
        res.status(200).json({
            count: users.length,
            users: users
        });
 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
 
/* Test:
   GET http://localhost:5000/api/users?name=raju
   GET http://localhost:5000/api/users?minAge=18&sort=name
   GET http://localhost:5000/api/users?name=sh&minAge=20
*/
    