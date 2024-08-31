const mongoose = require("mongoose");
const { Schema } = mongoose;

// Create the Mongoose Schema for UserProfile
const UserProfileSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: {
      type: String,
      required: true,
    },
    field: { type: String, required: true },
    year: { type: String }, // Optional field for students
    exam: { type: String, required: true }, // Optional field for exams
  },
  { timestamps: true }
);

// Create a Mongoose model
const UserProfile = mongoose.model("UserProfile", UserProfileSchema);

module.exports = UserProfile;
