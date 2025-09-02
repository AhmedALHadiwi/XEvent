import Layout from "@/components/eventx/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      window.location.href = "/";
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <Layout>
      <div className="max-w-sm mx-auto bg-card rounded-xl border shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <form className="space-y-3" onSubmit={submit}>
          <div>
            <label className="text-sm">Email</label>
            <input className="w-full rounded-lg border px-3 py-2" value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div>
            <label className="text-sm">Password</label>
            <input type="password" className="w-full rounded-lg border px-3 py-2" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          {error && <div className="text-rose-600 text-sm">{error}</div>}
          <button className="w-full rounded-lg bg-brand text-white px-3 py-2 font-medium">Sign In</button>
          <div className="text-sm text-muted-foreground text-center">Don't have an account? <a className="underline" href="/register">Register</a></div>
        </form>
      </div>
    </Layout>
  );
}
