"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiMail, FiMenu, FiPhone, FiPrinter, FiUser, FiX } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/tipo-casa", label: "Tipo de Casa" },
  { href: "/sobre-nos", label: "Sobre Nos" },
  { href: "/contacto", label: "Contacto" },
];

export function RentuHeader({ help = false }: { help?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-white shadow-[0_1px_0_rgba(0,0,0,0.06)]">
      <div className="mx-auto flex min-h-[76px] max-w-[1380px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:h-[90px] lg:px-10 lg:py-0">
        <Link className="flex min-w-0 items-center gap-2" href="/">
          <Image
            alt="Rentu"
            className="h-auto w-[132px] sm:w-[160px] lg:w-[190px]"
            height={58}
            priority
            src="/assets/rentu-logo.svg"
            width={190}
          />
        </Link>

        <nav className="hidden items-center gap-12 text-[18px] font-bold lg:flex">
          {navLinks.map((link, index) => (
            <Link
              className={`flex items-center gap-2 ${index === 0 ? "text-[#f0442b]" : ""}`}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          {help ? (
            <Link className="hidden text-[18px] font-extrabold sm:inline" href="/contacto">
              Ajude-me
            </Link>
          ) : (
            <>
              <a
                className="hidden items-center gap-2 text-[18px] font-extrabold md:flex"
                href="tel:+258821410299"
              >
                <FiPhone className="text-2xl" aria-hidden />
                (+258) 82 14 10 299
              </a>
              <Link
                aria-label="Entrar"
                className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-black bg-white sm:size-11"
                href="/login"
              >
                <FiUser className="text-xl" aria-hidden />
              </Link>
              <Link
                className="hidden h-10 shrink-0 place-items-center rounded bg-[#f0442b] px-3 text-center text-sm font-extrabold leading-tight text-white sm:h-12 sm:px-5 sm:text-[17px] md:grid"
                href="/adicionar-casa"
              >
                Adicionar Casa
              </Link>
            </>
          )}
          <button
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            className="grid size-10 shrink-0 place-items-center rounded border-2 border-black lg:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            type="button"
          >
            {menuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav className="border-t bg-white px-4 py-4 text-base font-black shadow-lg lg:hidden">
          <div className="mx-auto flex max-w-[1380px] flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                className="rounded px-3 py-3 hover:bg-[#f8f8f8]"
                href={link.href}
                key={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              className="mt-2 grid h-11 place-items-center rounded bg-[#f0442b] text-white"
              href="/adicionar-casa"
              onClick={() => setMenuOpen(false)}
            >
              Adicionar Casa
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

export function RentuFooter() {
  return (
    <footer className="mt-16 bg-black text-white">
      <div className="mx-auto grid max-w-[1480px] gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 md:px-10 lg:grid-cols-[1.15fr_1fr_1.15fr_1.25fr] lg:gap-14 lg:py-24">
        <section id="sobre">
          <h2 className="mb-8 text-xl font-black lg:mb-12">Sobre Nos</h2>
          <p className="max-w-[330px] text-base font-semibold leading-7 lg:text-lg">
            A Rentu nasceu da necessidade de simplificar uma das jornadas mais
            importantes na vida de qualquer pessoa que busca por um lar via
            arrendamento e com base no seu orcamento.
          </p>
        </section>

        <section>
          <h2 className="mb-8 text-xl font-black lg:mb-10">Acesso Rapido</h2>
          <nav className="flex flex-col gap-4 text-base font-semibold lg:text-lg">
            <Link href="/">Inicio</Link>
            <Link href="/sobre-nos">Sobre Nos</Link>
            <Link href="/tipo-casa">Casas</Link>
            <Link href="/#intermediarios">Intermediarios</Link>
            <Link href="/#noticias">Noticias</Link>
            <Link href="/contacto">Contacto</Link>
          </nav>
        </section>

        <section id="contacto">
          <h2 className="mb-7 text-xl font-black">Contacto</h2>
          <div className="space-y-5 text-base font-semibold lg:text-lg">
            <p className="flex items-center gap-4">
              <HiOutlineBuildingOffice2 className="shrink-0 text-xl" aria-hidden />
              Av. 25 de Setembro Nr. 1123
            </p>
            <p className="flex items-center gap-4">
              <FiPhone className="shrink-0 text-xl" aria-hidden />
              (+258) 82 14 10 299
            </p>
            <p className="flex items-center gap-4 break-all">
              <FiPrinter className="shrink-0 text-xl" aria-hidden />
              comercial@rentu.co.mz
            </p>
            <p className="flex items-center gap-4 break-all">
              <FiMail className="shrink-0 text-xl" aria-hidden />
              info@rentu.co.mz
            </p>
          </div>

          <div className="mt-9 flex flex-wrap gap-3 lg:mt-11">
            <SocialButton label="Facebook">
              <FaFacebookF aria-hidden />
            </SocialButton>
            <SocialButton label="Whatsapp">
              <FaWhatsapp aria-hidden />
            </SocialButton>
            <SocialButton label="LinkedIn">
              <FaLinkedinIn aria-hidden />
            </SocialButton>
            <SocialButton label="Instagram">
              <FaInstagram aria-hidden />
            </SocialButton>
          </div>
        </section>

        <section>
          <h2 className="mb-7 text-2xl font-black text-white lg:text-3xl">
            Aceder a Conta
          </h2>
          <div className="space-y-3">
            <input
              className="h-12 w-full rounded bg-white px-5 text-base text-black outline-[#ff2638]"
              placeholder="Nome do utilizador"
            />
            <input
              className="h-12 w-full rounded bg-white px-5 text-base text-black outline-[#ff2638]"
              placeholder="Palavra Passe"
              type="password"
            />
            <Link
              className="grid h-12 w-full place-items-center rounded bg-[#ff2638] text-lg font-black text-white"
              href="/login"
            >
              Aceder
            </Link>
            <div className="flex flex-wrap justify-between gap-3 pt-2 text-base font-black">
              <Link href="/criar-conta">Criar Conta</Link>
              <Link href="/recuperar-senha">Esqueceu Senha?</Link>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-[#ff2638]">
        <div className="mx-auto flex min-h-[72px] max-w-[1480px] flex-col items-center justify-center gap-3 px-5 py-4 text-center sm:px-8 md:flex-row md:justify-between md:text-left lg:px-10">
          <p className="text-base font-semibold lg:text-lg">
            Copyright. Rentu - 2026. Desenvolvido pela MaCh.
          </p>
          <a className="text-base font-semibold lg:text-lg" href="#">
            Termos & Condicoes
          </a>
        </div>
      </div>
    </footer>
  );
}

function SocialButton({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <a
      aria-label={label}
      className="grid size-12 place-items-center rounded bg-[#ff1010] text-xl text-white sm:size-13"
      href="#"
    >
      {children}
    </a>
  );
}
