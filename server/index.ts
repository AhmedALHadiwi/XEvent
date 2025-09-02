import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import cookieParser from "cookie-parser";
import { connectMongo } from "./db";
import { register, login, me } from "./routes/auth";
import { requireAuth } from "./routes/middleware";
import { listEvents, myTickets, bookTicket } from "./routes/tickets";

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

  // Events & Tickets
  app.get("/api/events", listEvents);
  app.get("/api/tickets/my", requireAuth, myTickets);
  app.post("/api/tickets/book", requireAuth, bookTicket);

  return app;
}
