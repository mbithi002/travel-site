import { v2 as Cloudinary } from "cloudinary";
import Destination from "../models/destination-model.js";

export const getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find().sort({ createdAt: -1 });
    if (!destinations) {
      return res.status(404).json({ error: "No destinations found" });
    }
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error("Error in getDestinations:", error);
  }
};

export const getDestination = async (req, res) => {
  try {
    const { id: destinationId } = req.params;
    const destination = await Destination.findById(destinationId);
    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }
    res.status(200).json(destination);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error("Error in getDestination:", error);
  }
};

export const createDestination = async (req, res) => {
  try {
    const user = req.user;

    const {
      name,
      description,
      images,
      location,
      categories,
      price,
      availability,
    } = req.body;

    if (!user) {
      return res.status(404).json({ error: `User not found ${req.user}` });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized" });
    }

    if (!images)
      return res.status(403).json({
        error: "No images provided",
      });

    const uploadedImages = [];
    for (const image of images) {
      const result = await Cloudinary.uploader.upload(image);
      uploadedImages.push(result.secure_url);
    }

    const newDestination = new Destination({
      name,
      description,
      images: uploadedImages,
      location,
      categories,
      price,
      availability,
    });

    const savedDestination = await newDestination.save();

    res.status(200).json(savedDestination);
  } catch (error) {
    console.error("Error in createDestination:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateDestination = async (req, res) => {
  try {
    const user = req.user;
    const { id: destinationId } = req.params;

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // if (user.role !== "admin") {
    //   return res.status(403).json({ error: "Not authorized" });
    // }

    const destination = await Destination.findById(destinationId);
    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }

    const {
      name,
      description,
      // images,
      location,
      categories,
      price,
      availability,
    } = req.body;

    // const uploadedImages = await Promise.all(
    //   images?.map((image) => uploadImageToCloudinary(image))
    // );

    destination.name = name || destination.name;
    destination.description = description || destination.description;
    // destination.images = uploadedImages || destination.images;
    destination.location = location || destination.location;
    destination.categories = categories || destination.categories;
    destination.price = price || destination.price;
    destination.availability = availability || destination.availability;

    await destination.save();
    const updatedDestination = await Destination.findById(destinationId);

    res.status(200).json(updatedDestination);
  } catch (error) {
    console.error("Error in updateDestination:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteDestination = async (req, res) => {
  try {
    const { id: destinationId } = req.params;
    const user = req.user;
    const destination = await Destination.findById(destinationId);

    if (!user) {
      return res.status(404).json({
        error: "user not found",
      });
    }

    // if (user.role !== admin) {
    //   return res.status(403).json({
    //     error: "not authorized",
    //   });
    // }

    if (!destination) {
      return res.status(404).json({
        error: "Destination not found",
      });
    }

    await Destination.findByIdAndDelete(destinationId);
    res.status(200).json({ message: "Destination deleted successfully" });
  } catch (error) {
    console.error("Error in updateDestination:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
