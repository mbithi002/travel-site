import mongoose from "mongoose";

const connectToMongo = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connecting to MongoDb", error);
    process.exit();
  }
};

export default connectToMongo;
