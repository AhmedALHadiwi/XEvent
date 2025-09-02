import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    venue: { type: String, required: true },
    price: { type: Number, required: true },
    totalSeats: { type: Number, required: true },
  },
  { timestamps: true },
);

export const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);
