import express from "express";
import {
    cancelBooking,
    createBooking,
    deleteBooking,
    getBooking,
    getBookings,
    getBookingsForDestination,
    updateBooking,
} from "../../controllers/booking-controller.js";
import { protectRoute } from "../../middleware/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, createBooking);
router.get("/", protectRoute, getBookings);
router.get("/forDestination/:id", protectRoute, getBookingsForDestination);
router.get("/:id", protectRoute, getBooking);
router.put("/:id", protectRoute, updateBooking);
router.delete("/:id", protectRoute, deleteBooking);
router.put("/cancel/:id", protectRoute, cancelBooking);

export default router;
