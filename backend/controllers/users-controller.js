import bcrypt from "bcryptjs";
import User from "../models/user-model.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (!users) {
      return res.status(404).json({
        error: "no users found",
      });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
    console.log("Error in getUsers", error);
  }
};

export const getUser = async (req, res) => {
  try {
    const { id: userId } = req.params;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "user not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
    console.log("Error in getUser: ", error);
  }
};
export const updateUser = async (req, res) => {
  const { username, oldPassword, newPassword, email, fullName } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    if ((!newPassword && oldPassword) || (!oldPassword && newPassword)) {
      return res.status(400).json({
        error: "Old password and new password must be provided",
      });
    }

    if (newPassword && oldPassword) {
      if (newPassword.length < 8) {
        return res.status(403).json({
          error: "password length must be atleast 8 characters",
        });
      }
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (isMatch) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
      } else {
        return res.status(403).json({
          error: "Current password mismatch, please try again",
        });
      }
    }

    if (username && username !== user.username) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({
          error: "Username already exists, please choose another",
        });
      }
    }

    user.fullName = fullName || user.fullName;
    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();

    user.password = undefined;

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
    console.log("Error in update user", error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: "no user found",
      });
    }
    const response = await User.findByIdAndDelete(userId);
    res.status(200).json({
      message: "user deleted successfullys",
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
    console.log("Error in delete user", error);
  }
};
