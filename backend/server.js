import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import connectToMongo from "./db/connectToMongo.js";
import authRoutes from "./routes/auth/auth-routes.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server is running on port: 5000");
  connectToMongo();
});
