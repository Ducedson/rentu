import Image from "next/image";
import Link from "next/link";
import { FiMail, FiPhone, FiPrinter, FiUser } from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

export function RentuHeader({ help = false }: { help?: boolean }) {
  return (
    <header className="sticky top-0 z-20 bg-white shadow-[0_1px_0_rgba(0,0,0,0.06)]">
      <div className="mx-auto flex min-h-[76px] max-w-[1380px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:h-[90px] lg:px-10 lg:py-0">
        <Link className="flex min-w-0 items-center gap-2" href="/">
          <Image
            alt="Rentu"
            height={58}
            priority
            src="/assets/rentu-logo.svg"
            width={190}
            className="h-auto w-[132px] sm:w-[160px] lg:w-[190px]"
          />
        </Link>

        <nav className="hidden items-center gap-12 text-[18px] font-bold lg:flex">
          <Link className="flex items-center gap-2 text-[#f0442b]" href="/">
            Inicio
          </Link>
          <Link className="flex items-center gap-2" href="/tipo-casa">
            Tipo de Casa
          </Link>
          <Link className="flex items-center gap-2" href="/sobre-nos">
            Sobre Nós
          </Link>
          <Link className="flex items-center gap-2" href="/contacto">
            Contacto
          </Link>
        </nav>

        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          {help ? (
            <Link className="text-[18px] font-extrabold" href="/contacto">
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
                className="grid h-10 shrink-0 place-items-center rounded bg-[#f0442b] px-3 text-center text-sm font-extrabold leading-tight text-white sm:h-12 sm:px-5 sm:text-[17px]"
                href="/adicionar-casa"
              >
                Adicionar Casa
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export function RentuFooter() {
  return (
    <footer className="mt-16 bg-black text-white">
      <div className="mx-auto grid max-w-[1480px] gap-14 px-10 py-24 md:grid-cols-[1.15fr_1fr_1.15fr_1.25fr]">
        <section id="sobre">
          <h2 className="mb-12 text-xl font-black">Sobre Nós</h2>
          <p className="max-w-[330px] text-lg font-semibold leading-7">
            A Rentu nasceu da necessidade de simplificar uma das jornadas mais
            importantes na vida de qualquer pessoa que busca por um lar via
            arrendamento e com base no seu orçamento.
          </p>
        </section>

        <section>
          <h2 className="mb-10 text-xl font-black">Acesso Rápido</h2>
          <nav className="flex flex-col gap-4 text-lg font-semibold">
            <Link href="/">Início</Link>
            <Link href="/sobre-nos">Sobre Nós</Link>
            <Link href="/tipo-casa">Casas</Link>
            <Link href="/#intermediarios">Intermediários</Link>
            <Link href="/#noticias">Notícias</Link>
            <Link href="/contacto">Contacto</Link>
          </nav>
        </section>

        <section id="contacto">
          <h2 className="mb-7 text-xl font-black">Contacto</h2>
          <div className="space-y-5 text-lg font-semibold">
            <p className="flex items-center gap-4">
              <HiOutlineBuildingOffice2 className="text-xl" aria-hidden />
              Av. 25 de Setembro Nr. 1123
            </p>
            <p className="flex items-center gap-4">
              <FiPhone className="text-xl" aria-hidden />
              (+258) 82 14 10 299
            </p>
            <p className="flex items-center gap-4">
              <FiPrinter className="text-xl" aria-hidden />
              comercial@rentu.co.mz
            </p>
            <p className="flex items-center gap-4">
              <FiMail className="text-xl" aria-hidden />
              info@rentu.co.mz
            </p>
          </div>

          <div className="mt-11 flex gap-3">
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
          <h2 className="mb-7 text-3xl font-black text-[#1b1b1b]">
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
            <div className="flex justify-between pt-2 text-base font-black">
              <Link href="/criar-conta">Criar Conta</Link>
              <Link href="/recuperar-senha">Esqueceu Senha?</Link>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-[#ff2638]">
        <div className="mx-auto flex min-h-[72px] max-w-[1480px] items-center justify-between gap-6 px-10">
          <p className="text-lg font-semibold">
            Copyright. Rentu - 2026. Desenvolvido pela MaCh.
          </p>
          <a className="text-lg font-semibold" href="#">
            Termos & Condições
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
      className="grid size-13 place-items-center rounded bg-[#ff1010] text-xl text-white"
      href="#"
    >
      {children}
    </a>
  );
}

