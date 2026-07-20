const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
    },
    course: {
      type: String,
      required: [true, "Course is required"],
      enum: {
        values: [
          "Frontend Development",
          "Backend Development",
          "Full Stack Development",
        ],
        message: "{VALUE} is not a valid course",
      },
    },
    age: {
      type: Number,
      min: [16, "Age must be at least 16"],
      max: [40, "Age must be at most 40"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
