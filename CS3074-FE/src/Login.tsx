import React, { useState } from "react";

interface LoginProps {
  onLogin: (user: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email);
    }
  };

  return (
    <div className="login-modal fixed inset-0 flex justify-center items-center bg-black/30">
      <div className="login-container bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full">
        <h2 className="text-3xl font-semibold mb-6 text-red-800 text-center">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border border-red-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-red-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition shadow-lg w-full"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
