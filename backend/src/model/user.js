import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    // Optional now because OAuth users may not have password
    password: {
      type: String,
      required: false,
    },

    // Google OAuth fields
    googleId: {
      type: String,
    },

    avatar: {
      type: String,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
