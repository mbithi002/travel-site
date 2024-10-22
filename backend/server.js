import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import connectToMongo from "./db/connectToMongo.js";
import authRoutes from "./routes/auth/auth-routes.js";
import bookingRoutes from "./routes/bookings/booking-route.js";
import destinationRoutes from "./routes/destinations/destination-routes.js";
import reviewRoutes from "./routes/reviews/review-route.js";
import usersRoutes from "./routes/users/users-routes.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/review", reviewRoutes);

app.listen(5000, () => {
  console.log("Server is running on port: 5000");
  connectToMongo();
});
