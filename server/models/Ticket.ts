import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    seatNumber: { type: String, required: true },
    status: { type: String, enum: ["booked", "checked_in"], default: "booked" },
    qrCode: { type: String },
  },
  { timestamps: true },
);

export const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", TicketSchema);
