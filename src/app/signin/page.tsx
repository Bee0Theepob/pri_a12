"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import userLogIn from "@/libs/userLogIn";
import getUserProfile from "@/libs/getUserProfile";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const loginJson = await userLogIn(email, password);
      const token = (loginJson as any).token;
      if (!token) throw new Error("No token returned from server");
      const profile = await getUserProfile(token);

      try {
        localStorage.setItem("venue_token", token);
        localStorage.setItem(
          "venue_user",
          JSON.stringify(profile.data || profile)
        );
      } catch (e) {
        // ignore storage errors
      }

      // navigate to home (hard navigation to ensure we leave /login)
      window.location.href = "/";
    } catch (err: any) {
      setError(err?.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded shadow"
      >
        <h2 className="text-xl mb-4">Sign In</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <label className="block mb-2">
          <span className="text-sm">Email</span>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border rounded px-2 py-1"
          />
        </label>

        <label className="block mb-4">
          <span className="text-sm">Password</span>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border rounded px-2 py-1"
          />
        </label>

        <button
          disabled={loading}
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
