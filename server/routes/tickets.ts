import { RequestHandler } from "express";
import { isMongoConnected } from "../db";
import { Event } from "../models/Event";
import { Ticket } from "../models/Ticket";
import { Types } from "mongoose";

// In-memory fallback
const mem = {
  events: [
    { id: "1", title: "Colombo Music Festival", price: 5000, venue: "Open Air Theater, Colombo", date: new Date("2025-04-12"), totalSeats: 1200 },
    { id: "2", title: "Lanka Supercar Show", price: 3000, venue: "Open Air Theater, Colombo", date: new Date("2025-04-15"), totalSeats: 800 },
    { id: "3", title: "Rock & Roll Night", price: 3000, venue: "Open Air Theater, Colombo", date: new Date("2025-03-03"), totalSeats: 700 },
  ],
  tickets: [] as { id: string; userId: string; eventId: string; seatNumber: string; status: string }[],
};

export const listEvents: RequestHandler = async (_req, res) => {
  if (isMongoConnected()) {
    const events = await Event.find().sort({ date: 1 });
    return res.json({ events });
  } else {
    return res.json({ events: mem.events });
  }
};

export const myTickets: RequestHandler = async (req, res) => {
  const user = (req as any).user as { id: string };
  if (isMongoConnected()) {
    const tickets = await Ticket.find({ user: new Types.ObjectId(user.id) }).populate("event");
    return res.json({ tickets });
  } else {
    const tickets = mem.tickets.filter((t) => t.userId === user.id).map((t) => ({ ...t, event: mem.events.find((e) => e.id === t.eventId) }));
    return res.json({ tickets });
  }
};

export const bookTicket: RequestHandler = async (req, res) => {
  const user = (req as any).user as { id: string };
  const { eventId, seatNumber } = req.body as { eventId: string; seatNumber: string };
  if (!eventId || !seatNumber) return res.status(400).json({ error: "Missing fields" });
  if (isMongoConnected()) {
    const ticket = await Ticket.create({ user: new Types.ObjectId(user.id), event: new Types.ObjectId(eventId), seatNumber, status: "booked" });
    return res.json({ ticket });
  } else {
    const ticket = { id: String(mem.tickets.length + 1), userId: user.id, eventId, seatNumber, status: "booked" };
    mem.tickets.push(ticket);
    return res.json({ ticket });
  }
};
