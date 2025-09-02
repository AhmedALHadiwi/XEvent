import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { isMongoConnected } from "../db";
import { User } from "../models/User";

// In-memory fallback
const mem = {
  users: [] as { id: string; name: string; email: string; passwordHash: string; role: "admin" | "user" }[],
};

const sign = (user: { id: string; role: string; email: string; name: string }) =>
  jwt.sign(user, process.env.JWT_SECRET || "devsecret", { expiresIn: "7d" });

export const register: RequestHandler = async (req, res) => {
  const { name, email, password, role } = req.body as { name: string; email: string; password: string; role?: "admin" | "user" };
  if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });
  const passwordHash = await bcrypt.hash(password, 10);
  if (isMongoConnected()) {
    try {
      const existing = await User.findOne({ email });
      if (existing) return res.status(409).json({ error: "Email already used" });
      const doc = await User.create({ name, email, passwordHash, role: role || "user" });
      const token = sign({ id: String(doc._id), role: doc.role, email: doc.email, name: doc.name });
      return res.json({ token });
    } catch (e) {
      return res.status(500).json({ error: "Registration failed" });
    }
  } else {
    const exists = mem.users.find((u) => u.email === email);
    if (exists) return res.status(409).json({ error: "Email already used" });
    const id = String(mem.users.length + 1);
    mem.users.push({ id, name, email, passwordHash, role: role || "user" });
    const token = sign({ id, role: role || "user", email, name });
    return res.json({ token });
  }
};

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body as { email: string; password: string };
  if (!email || !password) return res.status(400).json({ error: "Missing fields" });
  if (isMongoConnected()) {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });
    const token = sign({ id: String(user._id), role: user.role, email: user.email, name: user.name });
    return res.json({ token });
  } else {
    const user = mem.users.find((u) => u.email === email);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });
    const token = sign({ id: user.id, role: user.role, email: user.email, name: user.name });
    return res.json({ token });
  }
};

export const me: RequestHandler = async (req, res) => {
  const user = (req as any).user;
  return res.json({ user });
};
