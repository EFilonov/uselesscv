'use server';
import mongoose from "mongoose";

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

let isConnected = false;

export const connectMongo = async () => {
  if (isConnected || mongoose.connection.readyState === 1) {
    // if the connection is already established, do nothing
    return;
  }
  try {
    await mongoose.connect(mongoUri, {
      serverApi: { version: '1' },
    });
    isConnected = true;
    console.log("MongoDB connected via Mongoose");
  } catch (err) {
    console.error("Failed to connect to MongoDB via Mongoose", err);
    throw err;
  }
};

