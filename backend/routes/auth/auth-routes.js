import express from "express";
import {
  authUser,
  login,
  logout,
  signup,
} from "../../controllers/auth-controller.js";
import { protectRoute } from "../../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", protectRoute, logout);

router.get("/authUser", protectRoute, authUser);

export default router;
