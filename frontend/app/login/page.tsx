"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RentuHeader } from "../components/rentu-chrome";
import { loginAdmin } from "@/lib/admin";
import { useAuth } from "@/lib/auth-context";
import { getDashboardPath } from "@/lib/properties-ui";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginAdmin(email, password);
      
      login(response.user, response.access_token);
      router.push(getDashboardPath(response.user.role));
    } catch (err: any) {
      setError(err.response?.data?.message || "Email ou senha incorretos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <RentuHeader />
      <section
        className="mx-auto grid min-h-[620px] max-w-[1380px] items-center gap-10 bg-cover bg-center px-10 py-14 lg:grid-cols-[1fr_520px]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,.9), rgba(255,255,255,.62)), url(/assets/ali.jpg)",
        }}
      >
        <div>
          <p className="text-4xl font-black">Bem-Vindo a</p>
          <p className="mt-2 text-6xl font-black text-[#f0442b]">Rentu!!</p>
          <p className="mt-6 text-lg text-gray-600 max-w-md">
            Acesse sua conta para gerenciar propriedades, visualizar favoritos ou acessar o painel de controle.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded bg-white/95 p-8 shadow-[0_8px_28px_rgba(0,0,0,.18)]">
          <h1 className="mb-2 text-center text-3xl font-black">
            Aceder a Conta
          </h1>
          <p className="text-center text-sm text-gray-500 mb-6">
            User Normal ou Admin
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {error}
            </div>
          )}

          <label className="mb-5 block">
            <span className="mb-2 block font-bold">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="h-12 w-full rounded border px-4 outline-[#f0442b]"
              required
            />
          </label>
          <label className="mb-7 block">
            <span className="mb-2 block font-bold">Palavra Passe</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua senha"
              className="h-12 w-full rounded border px-4 outline-[#f0442b]"
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mx-auto grid h-12 w-40 place-items-center rounded bg-[#f0442b] hover:bg-[#d63220] text-lg font-black text-white transition-colors disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <div className="mt-6 text-center text-xs text-gray-500 mb-4">
            <p className="mb-2">Para testar, use:</p>
            <p>Email: <strong>admin@rentu.com</strong></p>
            <p>Senha: <strong>admin123</strong></p>
          </div>

          <div className="mt-6 flex justify-center gap-10 font-bold text-[#555]">
            <Link href="/criar-conta" className="hover:text-[#f0442b]">Criar Conta</Link>
            <Link href="/recuperar-senha" className="hover:text-[#f0442b]">Esqueceu senha?</Link>
          </div>
        </form>
      </section>
    </main>
  );
}
