import express from "express";
import {
    deleteUser,
    getUser,
    getUsers,
    updateUser,
} from "../../controllers/users-controller.js ";
import { protectRoute } from "../../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getUsers);
router.get("/:id", protectRoute, getUser);
router.post("/update", protectRoute, updateUser);
router.delete("/", protectRoute, deleteUser);

export default router;
