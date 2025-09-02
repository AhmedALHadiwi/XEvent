import mongoose from "mongoose";

let connected = false;
export async function connectMongo(uri?: string) {
  const mongoUri = uri || process.env.MONGODB_URI;
  if (!mongoUri) {
    console.warn("MONGODB_URI not set. Running with in-memory repositories.");
    connected = false;
    return false;
  }
  if (connected) return true;
  try {
    await mongoose.connect(mongoUri);
    connected = true;
    console.log("MongoDB connected");
    return true;
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    connected = false;
    return false;
  }
}

export function isMongoConnected() {
  return connected;
}
