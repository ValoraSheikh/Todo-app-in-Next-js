"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevent NextAuth from redirecting automatically
    });

    if (res?.error) {
      setMessage("❌ " + res.error);
    } else {
      setMessage("✅ Logged in successfully!");
      router.push("/"); // Change to your desired protected route
    }

    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto p-6 mt-10 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {message && (
          <p
            className={`text-sm mt-2 ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
