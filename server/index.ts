import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import cookieParser from "cookie-parser";
import { connectMongo } from "./db";
import { register, login, me } from "./routes/auth";
import { requireAuth, requireAdmin } from "./routes/middleware";
import { listEvents, myTickets, bookTicket } from "./routes/tickets";
import { createEvent, updateEvent, deleteEvent } from "./routes/events";
import { getDashboardAnalytics, exportAnalytics } from "./routes/analytics";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // Connect Mongo (if URI provided)
  connectMongo();

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Auth
  app.post("/api/auth/register", register);
  app.post("/api/auth/login", login);
  app.get("/api/auth/me", requireAuth, me);

  // Events & Tickets (Public access for listing, admin for CRUD)
  app.get("/api/events", listEvents);
  app.post("/api/events", requireAuth, requireAdmin, createEvent);
  app.put("/api/events/:id", requireAuth, requireAdmin, updateEvent);
  app.delete("/api/events/:id", requireAuth, requireAdmin, deleteEvent);
  
  app.get("/api/tickets/my", requireAuth, myTickets);
  app.post("/api/tickets/book", requireAuth, bookTicket);

  // Analytics (Admin only)
  app.get("/api/analytics/dashboard", requireAuth, requireAdmin, getDashboardAnalytics);
  app.get("/api/analytics/export", requireAuth, requireAdmin, exportAnalytics);

  return app;
}
