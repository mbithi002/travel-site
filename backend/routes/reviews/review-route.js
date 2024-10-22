import express from "express";
import {
    createReview,
    getReview,
    getReviews,
    getReviewsForDestination,
} from "../../controllers/review-controller.js";
import { protectRoute } from "../../middleware/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, createReview);
router.get("/", getReviews);
router.get("/:id", getReview);
router.get("/destination/:id", getReviewsForDestination);
export default router;
