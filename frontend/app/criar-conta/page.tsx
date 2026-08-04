"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { RentuHeader } from "../components/rentu-chrome";
import { useAuth } from "@/lib/auth-context";
import { registerUser } from "@/lib/api";
import { getDashboardPath } from "@/lib/properties-ui";

function getApiErrorMessage(error: unknown, fallback: string) {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string" &&
    ["ERR_NETWORK", "ECONNREFUSED"].includes(error.code)
  ) {
    return "Não foi possível ligar ao backend. Confirme se o servidor está rodando em http://localhost:3001.";
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "data" in error.response &&
    typeof error.response.data === "object" &&
    error.response.data !== null &&
    "message" in error.response.data
  ) {
    if (typeof error.response.data.message === "string") {
      return error.response.data.message;
    }

    if (Array.isArray(error.response.data.message)) {
      return error.response.data.message.join(" ");
    }
  }

  return fallback;
}

export default function CreateAccountPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "OWNER",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validações
    if (!formData.name || !formData.email || !formData.password) {
      setError("Por favor, preencha todos os campos");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres");
      setLoading(false);
      return;
    }

    try {
      const response = await registerUser({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        role: formData.role,
      });

      login(response.user, response.access_token);
      router.push(getDashboardPath(response.user.role));
    } catch (err) {
      setError(getApiErrorMessage(err, "Erro ao criar conta. Tente novamente."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-black">
      <RentuHeader />
      <section
        className="mx-auto grid min-h-[calc(100vh-90px)] max-w-[1380px] items-center gap-8 bg-cover bg-center px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[minmax(0,1fr)_minmax(420px,540px)] lg:gap-10 lg:px-10 lg:py-14"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,.94), rgba(255,255,255,.76)), url(/assets/hero-living.jpg)",
        }}
      >
        <div className="max-w-xl text-center sm:text-left">
          <p className="text-3xl font-black leading-tight sm:text-4xl">Bem-Vindo a</p>
          <p className="mt-2 text-5xl font-black leading-none text-[#f0442b] sm:text-6xl">Rentu!!</p>
          <p className="mt-5 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg">
            Crie sua conta e comece a gerenciar imóveis ou encontrar o imóvel
            dos seus sonhos.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full rounded bg-white/95 p-5 shadow-[0_8px_28px_rgba(0,0,0,.18)] sm:p-8"
        >
          <h1 className="mb-2 text-center text-2xl font-black sm:text-3xl">Criar Conta</h1>
          <p className="mb-5 text-center text-sm text-gray-500 sm:mb-6">
            Junte-se à comunidade Rentu
          </p>

          {error && (
            <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <label className="mb-4 block">
            <span className="mb-2 block font-bold">Nome Completo</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="h-12 w-full min-w-0 rounded border px-4 outline-[#f0442b]"
              placeholder="Seu nome completo"
              required
            />
          </label>

          <label className="mb-4 block">
            <span className="mb-2 block font-bold">Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="h-12 w-full min-w-0 rounded border px-4 outline-[#f0442b]"
              placeholder="seu@email.com"
              required
            />
          </label>

          <label className="mb-4 block">
            <span className="mb-2 block font-bold">Senha</span>
            <div className="flex h-12 overflow-hidden rounded border focus-within:outline focus-within:outline-2 focus-within:outline-[#f0442b]">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="min-w-0 flex-1 px-4 outline-none"
                placeholder="Mínimo 6 caracteres"
                required
              />
              <button
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                className="grid w-14 shrink-0 place-items-center text-2xl text-[#111] transition-colors hover:bg-[#f7f7f7]"
                onClick={() => setShowPassword((value) => !value)}
                type="button"
              >
                {showPassword ? <FiEyeOff aria-hidden /> : <FiEye aria-hidden />}
              </button>
            </div>
          </label>

          <label className="mb-4 block">
            <span className="mb-2 block font-bold">Confirmar Senha</span>
            <div className="flex h-12 overflow-hidden rounded border focus-within:outline focus-within:outline-2 focus-within:outline-[#f0442b]">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="min-w-0 flex-1 px-4 outline-none"
                placeholder="Confirme sua senha"
                required
              />
              <button
                aria-label={showConfirmPassword ? "Ocultar confirmação de senha" : "Mostrar confirmação de senha"}
                className="grid w-14 shrink-0 place-items-center text-2xl text-[#111] transition-colors hover:bg-[#f7f7f7]"
                onClick={() => setShowConfirmPassword((value) => !value)}
                type="button"
              >
                {showConfirmPassword ? <FiEyeOff aria-hidden /> : <FiEye aria-hidden />}
              </button>
            </div>
          </label>

          <label className="mb-6 block">
            <span className="mb-2 block font-bold">Seleccionar Perfil</span>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="h-12 w-full min-w-0 rounded border px-4 outline-[#f0442b]"
            >
              <option value="OWNER">Proprietário (Vender/Alugar)</option>
              <option value="CLIENT">Cliente (Procurar Imóvel)</option>
              <option value="AGENT">Agente (Intermediário)</option>
              
            </select>
          </label>

          <label className="mb-6 flex items-start gap-3 text-sm font-bold sm:items-center sm:text-base">
            <input className="mt-1 sm:mt-0" type="checkbox" required />
            <span>Concordo com os Termos e Condições</span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded bg-[#f0442b] text-base font-black text-white transition-colors hover:bg-[#d63220] disabled:cursor-not-allowed disabled:opacity-50 sm:text-lg"
          >
            {loading ? "Criando conta..." : "Criar Conta"}
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Já tem conta?{" "}
            <Link href="/login" className="font-bold text-[#f0442b] hover:underline">
              Entrar
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
