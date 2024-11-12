import mongoose from "mongoose";
import Booking from "../models/booking-model.js";
import Destination from "../models/destination-model.js";

export const createBooking = async (req, res) => {
  try {
    const authUser = req.user;

    if (!authUser) {
      return res.status(404).json({
        error: "user not found",
      });
    }

    const { user, destination, adults, children } = req.body;

    const exsistsDestination = await Destination.findById(destination);

    if (!exsistsDestination) {
      return res.status(401).json({
        error: "destination is not available",
      });
    }

    const newBooking = new Booking({
      user,
      destination,
      adults: Number(adults),
      children: Number(children)
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
    console.log("Error in createBooking: ", error);
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate({
        path: "destination",
      })
      .populate({
        path: "user",
        select: "-password",
      })
      .sort({ createdAt: -1 });
    if (!bookings) {
      return res.status(404).json({
        error: "No bookings found",
      });
    }

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
    console.log("Error in getBookings: ", error);
  }
};

export const getBooking = async (req, res) => {
  try {
    const { id: bookingId } = req.params;
    const booking = await Booking.findById(bookingId)
      .populate({
        path: "destination",
      })
      .populate({
        path: "user",
        select: "-password",
      });

    if (!booking) {
      return res.status(404).json({
        error: "no booking found",
      });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
    console.log("Error in getBooking: ", error);
  }
};

export const updateBooking = async (req, res) => {
  try {
    const { id: bookingId } = req.params;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json0({
        error: "no booking found",
      });
    }
    const { userId, destinationId, status, paymentStatus } = req.body;

    booking.userId = userId || booking.userId;
    booking.destinationId = destinationId || booking.destinationId;
    booking.status = status || booking.status;
    booking.paymentStatus = paymentStatus || booking.paymentStatus;

    await booking.save();

    const updatedBooking = await Booking.findById(booking._id)
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "destination",
      });

    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
    console.log("Error in updateBooking: ", error);
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const { id: bookingId } = req.params;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        error: "booking not found",
      });
    }

    await Booking.findByIdAndDelete(bookingId);

    res.status(200).json({
      message: "booking deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
    console.log("Error in deleteBooking: ", error);
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { id: bookingId } = req.params;

    const booking = await Booking.findById(bookingId)
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "destination",
      });

    if (!booking) {
      return res.status(404).json({
        error: "booking not found",
      });
    }

    booking.status = "cancelled";

    await booking.save();

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
    console.log("Error in deleteBooking: ", error);
  }
};

export const getBookingsForDestination = async (req, res) => {
  try {
    const { id: destinationId } = req.params;

    // Check if the destinationId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(destinationId)) {
      return res.status(400).json({ error: "Invalid destination ID format" });
    }

    const destination = await Destination.findById(destinationId);
    if (!destination) {
      return res.status(404).json({ error: "No destination found" });
    }

    const bookings = await Booking.find({
      destination: destinationId,
    }).populate({
      path: "user",
      select: "-password",
    });

    if (bookings.length === 0) {
      return res.status(404).json({ error: "No bookings found" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error("Error in getBookingsForDestination: ", error);
  }
};
