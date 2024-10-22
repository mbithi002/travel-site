import express from "express";
import { protectRoute } from "../../middleware/protectRoute.js";

import {
    createDestination,
    deleteDestination,
    getDestination,
    getDestinations,
    updateDestination,
} from "../../controllers/destination-controller.js";

const router = express.Router();

router.post("/", protectRoute, createDestination);
router.get("/", getDestinations);
router.get("/:id", getDestination);
router.put("/:id", protectRoute, updateDestination);
router.delete("/:id", protectRoute, deleteDestination);

export default router;
