"use client";

import Link from "next/link";
import { useState } from "react";
import { FiCheckCircle, FiMail } from "react-icons/fi";
import { RentuHeader } from "../components/rentu-chrome";

export default function RecoverPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen bg-white text-black">
      <RentuHeader />
      <section className="mx-auto grid min-h-[560px] max-w-[1380px] place-items-center px-10 py-14">
        <div className="w-full max-w-lg rounded bg-white p-8 shadow-[0_8px_28px_rgba(0,0,0,.14)]">
          {submitted ? (
            <div className="text-center">
              <FiCheckCircle className="mx-auto mb-5 text-6xl text-[#f0442b]" />
              <h1 className="text-3xl font-black">Pedido recebido</h1>
              <p className="mt-4 font-semibold text-gray-600">
                Se existir uma conta com este email, a equipa Rentu podera orientar a recuperacao da senha.
              </p>
              <Link
                className="mt-8 inline-flex h-12 items-center justify-center rounded bg-[#f0442b] px-8 font-black text-white"
                href="/login"
              >
                Voltar ao login
              </Link>
            </div>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
              }}
            >
              <FiMail className="mb-4 text-5xl text-[#f0442b]" />
              <h1 className="text-3xl font-black">Recuperar senha</h1>
              <p className="mt-3 font-semibold text-gray-600">
                Informe o email usado na conta para iniciar a recuperacao.
              </p>
              <label className="mt-7 block">
                <span className="mb-2 block font-bold">Email</span>
                <input
                  className="h-12 w-full rounded border px-4 outline-[#f0442b]"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="seu@email.com"
                  required
                  type="email"
                  value={email}
                />
              </label>
              <button className="mt-6 h-12 w-full rounded bg-[#f0442b] font-black text-white" type="submit">
                Enviar pedido
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
