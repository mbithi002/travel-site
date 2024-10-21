import bcrypt from "bcryptjs";
import User from "../models/user-model.js";
import { generateJwt } from "../utils/generateJwt.js";

export const signup = async (req, res) => {
  try {
    const { email, password, username, fullName } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Invalid email format",
      });
    }

    const exsistingUser = await User.findOne({ username });

    if (exsistingUser) {
      return res.status(400).json({
        error: "Username already exists",
      });
    }

    const exsistingEmail = await User.findOne({ email });

    if (exsistingEmail) {
      return res.status(400).json({
        error: "email already used",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        error: "password must be atleast 8 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    generateJwt(newUser._id, res);

    res.status(200).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      bookings: newUser.bookings,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "user not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user?.password || "");

    if (!isMatch) {
      return res.status(403).json({
        error: "invalid password, please try again",
      });
    }

    generateJwt(user?._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      role: user.role,
      bookings: user.bookings,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
};

export const authUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
};
