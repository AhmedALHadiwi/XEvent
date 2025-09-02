import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { api } from "@/lib/api";

type User = { id: string; email: string; name: string; role: string } | null;

type AuthCtx = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const Ctx = createContext<AuthCtx | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return setLoading(false);
    api<{ user: any }>("/api/auth/me")
      .then((d) => setUser(d.user))
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const { token } = await api<{ token: string }>("/api/auth/login", { method: "POST", body: { email, password } });
    localStorage.setItem("token", token);
    const me = await api<{ user: any }>("/api/auth/me");
    setUser(me.user);
  };

  const register = async (name: string, email: string, password: string) => {
    const { token } = await api<{ token: string }>("/api/auth/register", { method: "POST", body: { name, email, password } });
    localStorage.setItem("token", token);
    const me = await api<{ user: any }>("/api/auth/me");
    setUser(me.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return <Ctx.Provider value={{ user, loading, login, register, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
