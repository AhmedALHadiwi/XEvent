import { RequestHandler } from "express";
import { isMongoConnected } from "../db";
import { Event } from "../models/Event";
import { Types } from "mongoose";

// In-memory fallback
const mem = {
  events: [
    { id: "1", title: "Colombo Music Festival", price: 5000, venue: "Open Air Theater, Colombo", date: new Date("2025-04-12"), totalSeats: 1200 },
    { id: "2", title: "Lanka Supercar Show", price: 3000, venue: "Open Air Theater, Colombo", date: new Date("2025-04-15"), totalSeats: 800 },
    { id: "3", title: "Rock & Roll Night", price: 3000, venue: "Open Air Theater, Colombo", date: new Date("2025-03-03"), totalSeats: 700 },
  ],
};

export const listEvents: RequestHandler = async (_req, res) => {
  if (isMongoConnected()) {
    const events = await Event.find().sort({ date: 1 });
    return res.json({ events });
  } else {
    return res.json({ events: mem.events });
  }
};

export const createEvent: RequestHandler = async (req, res) => {
  const { title, date, venue, price, totalSeats } = req.body;
  if (!title || !date || !venue || !price || !totalSeats) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (isMongoConnected()) {
    try {
      const event = await Event.create({ title, date: new Date(date), venue, price, totalSeats });
      return res.json({ event });
    } catch (error) {
      return res.status(500).json({ error: "Failed to create event" });
    }
  } else {
    const event = {
      id: String(mem.events.length + 1),
      title,
      date: new Date(date),
      venue,
      price,
      totalSeats
    };
    mem.events.push(event);
    return res.json({ event });
  }
};

export const updateEvent: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { title, date, venue, price, totalSeats } = req.body;

  if (isMongoConnected()) {
    try {
      const event = await Event.findByIdAndUpdate(
        new Types.ObjectId(id),
        { title, date: new Date(date), venue, price, totalSeats },
        { new: true }
      );
      if (!event) return res.status(404).json({ error: "Event not found" });
      return res.json({ event });
    } catch (error) {
      return res.status(500).json({ error: "Failed to update event" });
    }
  } else {
    const eventIndex = mem.events.findIndex(e => e.id === id);
    if (eventIndex === -1) return res.status(404).json({ error: "Event not found" });
    
    mem.events[eventIndex] = { ...mem.events[eventIndex], title, date: new Date(date), venue, price, totalSeats };
    return res.json({ event: mem.events[eventIndex] });
  }
};

export const deleteEvent: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (isMongoConnected()) {
    try {
      const event = await Event.findByIdAndDelete(new Types.ObjectId(id));
      if (!event) return res.status(404).json({ error: "Event not found" });
      return res.json({ message: "Event deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete event" });
    }
  } else {
    const eventIndex = mem.events.findIndex(e => e.id === id);
    if (eventIndex === -1) return res.status(404).json({ error: "Event not found" });
    
    mem.events.splice(eventIndex, 1);
    return res.json({ message: "Event deleted successfully" });
  }
};