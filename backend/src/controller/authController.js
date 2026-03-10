import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookies from "cookie-parser";
dotenv.config();

export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      return res
        .status(400)
        .json({ error: "User already exists with this email" });
    }
    const hashingPassword = await bcrypt.hash(password, 10);
    //
    const newUser = await User.create({
      name,
      email,
      password: hashingPassword,
    });
    res.status(201).json(newUser);
    console.log("User registered successfully");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(400).json({ error: error.message });
  }
}
// Login user
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUserEmail = await User.findOne({ email });
    if (!existingUserEmail) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUserEmail.password,
    );
    if (!isPasswordMatch) {
      return res.status(400).json({ error: "wrong password" });
    }

    const token = jwt.sign(
      { userId: existingUserEmail._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // localhost not HTTPS
      sameSite: "lax", // ✅ works locally
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
}

export async function logincheck(req, res) {
  if (req.cookies.token) {
    return res.json({ loggedIn: true });
  }

  res.status(401).json({ loggedIn: false });
}

export async function logoutUser(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.status(200).json({ message: "Logout successful" });
}
