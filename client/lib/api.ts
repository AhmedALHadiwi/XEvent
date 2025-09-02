export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export async function api<T>(path: string, opts: { method?: HttpMethod; body?: any; token?: string } = {}): Promise<T> {
  const token = opts.token || localStorage.getItem("token") || undefined;
  const res = await fetch(path, {
    method: opts.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  if (!res.ok) throw new Error((await res.json().catch(() => ({ error: res.statusText }))).error || res.statusText);
  return res.json();
}
