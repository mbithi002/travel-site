import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      unique: false,
    },
    date: {
      type: Date,
      default: Date.now
    },
    images: [
      {
        type: String,
        required: false,
      },
    ],
    location: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: String,
        required: true,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    ratings: [
      {
        type: Number,
        min: 1,
        max: 5,
      },
    ],
  },
  { timestamps: true }
);

const Destination = new mongoose.model("Destination", destinationSchema);

export default Destination;
