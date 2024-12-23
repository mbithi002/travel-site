import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import job from "./cron.js";
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

job.start()

const app = express();
const __dirname = path.resolve()

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/review", reviewRoutes);

if (process.env.NODE_ENV = "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  })
}

app.listen(5000, () => {
  console.log("Server is running on port: 5000");
  connectToMongo();
});
