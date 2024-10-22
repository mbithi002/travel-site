import Destination from "../models/destination-model.js";
import Review from "../models/review-model.js";

export const createReview = async (req, res) => {
  try {
    const authUser = req.user;
    if (!authUser) {
      return res.status(404).json({ error: "no user found" });
    }
    const { destination, comment, rating } = req.body;

    const existsDestination = await Destination.findById(destination);
    if (!existsDestination) {
      return res.status(404).json({
        error: "destination not found",
      });
    }

    const newReview = new Review({
      user: authUser._id,
      destination,
      comment,
      rating,
    });
    await newReview.save();
    res.status(200).json(newReview);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
    console.log("Error at createReview :", error);
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "destination",
      });
    if (!reviews) {
      return res.status(404).json({
        error: "no reviews found",
      });
    }
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
    console.log("Error at getReviews :", error);
  }
};

export const getReview = async (req, res) => {
  try {
    const { id: reviewId } = req.params;

    const review = await Review.findById(reviewId)
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "destination",
      });
    if (!review) {
      return res.status(404).json({
        error: "review not found",
      });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
    console.log("Error at getReview :", error);
  }
};

export const getReviewsForDestination = async (req, res) => {
  try {
    const { id: destinationId } = req.params;
    const destination = await Destination.findById(destinationId);
    if (!destination) {
      return res.status(200).json({
        error: "destination not found",
      });
    }
    const reviews = await Review.find({ destination: destinationId })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "destination",
      });

    if (!reviews) {
      return res.status(404).json({
        error: "no reviews found",
      });
    }
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
    console.log("Error at getReviewsForDestination :", error);
  }
};
