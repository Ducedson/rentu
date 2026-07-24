"use client";

import { useState } from "react";

const STORAGE_KEY = "rentu_frontend_password_ok";

export function FrontendPasswordGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const expectedPassword = process.env.NEXT_PUBLIC_FRONTEND_PASSWORD || "3435";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(
    () =>
      typeof window !== "undefined" &&
      sessionStorage.getItem(STORAGE_KEY) === "true"
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (password === expectedPassword) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setIsUnlocked(true);
      return;
    }

    setError("Senha incorreta");
  };

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#f7f3ec] px-6 text-[#1f2a24]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded bg-white p-7 shadow-[0_12px_35px_rgba(0,0,0,.12)]"
      >
        <h1 className="text-center text-2xl font-black">Acesso Rentu</h1>

        {error && (
          <div className="mt-5 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        <label className="mt-6 block">
          <span className="mb-2 block font-bold">Senha</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoFocus
            className="h-12 w-full rounded border border-gray-300 px-4 outline-[#f0442b]"
            required
          />
        </label>

        <button
          type="submit"
          className="mt-6 h-12 w-full rounded bg-[#f0442b] text-lg font-black text-white transition-colors hover:bg-[#d63220]"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}
