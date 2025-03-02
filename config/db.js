// Initiate connection to MongoDB
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoURI = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      maxPoolSize: 10, // Enable connection pooling
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      socketTimeoutMS: 45000, // Socket timeout to prevent hanging queries

    });

    console.log("✅ MongoDB connected with pooling");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
