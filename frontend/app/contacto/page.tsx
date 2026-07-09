"use client";

import Link from "next/link";
import {
  FiChevronDown,
  FiHome,
  FiPhone,
  FiUser,
  FiMapPin,
  FiMail,
  FiClock,
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiSend,
} from "react-icons/fi";
import { RentuFooter } from "../components/rentu-chrome"; 

export default function ContactoPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      {/* HEADER IDÊNTICO AO LAYOUT MÃE */}
      <header className="sticky top-0 z-20 bg-white shadow-[0_1px_0_rgba(0,0,0,0.06)]">
        <div className="mx-auto flex h-[90px] max-w-[1380px] items-center justify-between px-10">
          <Link className="flex items-center gap-2" href="/">
            <span className="grid size-9 place-items-center rounded bg-[#f0442b] text-white">
              <FiHome className="text-xl" aria-hidden />
            </span>
            <span className="leading-none">
              <span className="block text-[30px] font-black tracking-[-1px]">
                Rentu
              </span>
              <span className="block text-[9px] font-bold">
                O teu lar Provisório
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-12 text-[18px] font-bold lg:flex">
            <Link className="flex items-center gap-2" href="/">
              Início 
            </Link>
            <Link className="flex items-center gap-2" href="/#">
              Tipo de Casa 
            </Link>
            <Link className="flex items-center gap-2" href="/sobre-nos">
              Sobre Nós 
            </Link>
            <Link className="flex items-center gap-2 text-[#f0442b]" href="/contacto">
              Contacto 
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <a
              className="hidden items-center gap-2 text-[18px] font-extrabold md:flex"
              href="tel:+258821410299"
            >
              <FiPhone className="text-2xl" aria-hidden />
              (+258) 82 14 10 299
            </a>
            <Link
              className="grid size-11 place-items-center rounded-full border-2 border-black bg-white"
              aria-label="Entrar"
              href="/login"
            >
              <FiUser className="text-xl" aria-hidden />
            </Link>
            <Link
              className="grid h-12 place-items-center rounded bg-[#f0442b] px-5 text-[17px] font-extrabold text-white shadow-sm"
              href="/adicionar-casa"
            >
              Adicionar Casa
            </Link>
          </div>
        </div>
      </header>

      {/* HERO CONTACTO */}
      <section className="mx-auto max-w-[1380px] px-10 pt-6">
        <div
          className="relative flex min-h-[340px] items-center justify-center overflow-hidden bg-cover bg-center text-white"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url(/assets/kuvu.jpg)",
          }}
        >
          <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center px-6 text-center">
            <h1 className="text-[46px] font-black leading-tight tracking-[-1px] md:text-[54px]">
              Fale Connosco
            </h1>
            <p className="mt-4 max-w-[600px] text-[20px] md:text-[24px] font-extrabold text-gray-200">
              Estamos prontos para te ajudar a encontrar a tua próxima casa.
            </p>
          </div>
        </div>
      </section>

      {/* SECÇÃO PRINCIPAL DE CONTACTO */}
      <section className="mx-auto max-w-[1380px] px-10 py-20">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          
          {/* COLUNA DE INFORMAÇÕES (40%) */}
          <div className="lg:col-span-5 bg-[#f9f9f9] p-8 md:p-10 rounded border border-[#e5e5e5] shadow-sm">
            <h3 className="text-[32px] font-black tracking-[-1px] mb-8 relative after:content-[''] after:block after:w-12 after:h-1 after:bg-[#f0442b] after:mt-2">
              Informações
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="grid size-11 shrink-0 place-items-center rounded bg-[#fee2dd] text-[#f0442b] text-xl">
                  <FiMapPin />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-[#777] uppercase tracking-wider">Endereço</h4>
                  <p className="text-[18px] font-extrabold mt-0.5">Maputo, Av. 25 de Setembro Nr. 1123</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="grid size-11 shrink-0 place-items-center rounded bg-[#fee2dd] text-[#f0442b] text-xl">
                  <FiPhone />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-[#777] uppercase tracking-wider">Telefone</h4>
                  <p className="text-[18px] font-extrabold mt-0.5">(+258) 82 14 10 299</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="grid size-11 shrink-0 place-items-center rounded bg-[#fee2dd] text-[#f0442b] text-xl">
                  <FiMail />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-[#777] uppercase tracking-wider">E-mail</h4>
                  <p className="text-[18px] font-extrabold mt-0.5 break-all">comercial@rentu.co.mz</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="grid size-11 shrink-0 place-items-center rounded bg-[#fee2dd] text-[#f0442b] text-xl">
                  <FiClock />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-[#777] uppercase tracking-wider">Horário</h4>
                  <p className="text-[18px] font-extrabold mt-0.5">Seg - Sáb: 08h - 18h</p>
                </div>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="mt-10 pt-8 border-t border-[#e5e5e5]">
              <h4 className="text-[16px] font-extrabold text-black mb-4">Siga as nossas redes</h4>
              <div className="flex gap-4">
                <a href="#" className="grid size-11 place-items-center rounded-full bg-white border border-[#cfcfcf] text-black hover:bg-[#f0442b] hover:text-white hover:border-[#f0442b] transition-all text-xl" aria-label="Facebook">
                  <FiFacebook />
                </a>
                <a href="#" className="grid size-11 place-items-center rounded-full bg-white border border-[#cfcfcf] text-black hover:bg-[#f0442b] hover:text-white hover:border-[#f0442b] transition-all text-xl" aria-label="Instagram">
                  <FiInstagram />
                </a>
                <a href="#" className="grid size-11 place-items-center rounded-full bg-white border border-[#cfcfcf] text-black hover:bg-[#f0442b] hover:text-white hover:border-[#f0442b] transition-all text-xl" aria-label="LinkedIn">
                  <FiLinkedin />
                </a>
              </div>
            </div>
          </div>

          {/* COLUNA DO FORMULÁRIO (60%) */}
          <div className="lg:col-span-7 border border-[#e5e5e5] p-8 md:p-10 rounded shadow-sm bg-white">
            <h3 className="text-[32px] font-black tracking-[-1px] mb-8 relative after:content-[''] after:block after:w-12 after:h-1 after:bg-[#f0442b] after:mt-2">
              Envie-nos uma Mensagem
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-[15px] font-extrabold mb-2">Seu Nome *</label>
                  <input
                    type="text"
                    required
                    className="w-full h-12 px-4 border border-[#cfcfcf] rounded font-medium text-[#111111] bg-white outline-none focus:border-[#f0442b] transition-colors"
                    placeholder="Ex: Edson Duce"
                  />
                </div>
                <div>
                  <label className="block text-[15px] font-extrabold mb-2">Seu E-mail *</label>
                  <input
                    type="email"
                    required
                    className="w-full h-12 px-4 border border-[#cfcfcf] rounded font-medium text-[#111111] bg-white outline-none focus:border-[#f0442b] transition-colors"
                    placeholder="Ex: nome@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[15px] font-extrabold mb-2">Assunto</label>
                <input
                  type="text"
                  className="w-full h-12 px-4 border border-[#cfcfcf] rounded font-medium text-[#111111] bg-white outline-none focus:border-[#f0442b] transition-colors"
                  placeholder="Sobre o que gostarias de falar?"
                />
              </div>

              <div>
                <label className="block text-[15px] font-extrabold mb-2">Mensagem *</label>
                <textarea
                  rows={5}
                  required
                  className="w-full p-4 border border-[#cfcfcf] rounded font-medium text-[#111111] bg-white outline-none focus:border-[#f0442b] transition-colors resize-none"
                  placeholder="Escreve aqui os detalhes da tua mensagem..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="flex h-12 items-center justify-center gap-3 rounded bg-[#f0442b] px-8 text-[17px] font-extrabold text-white shadow-[0_3px_5px_rgba(0,0,0,.20)] hover:bg-[#d8351d] transition-colors"
              >
                Enviar Mensagem <FiSend className="text-lg" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* MAPA GOOGLE */}
      <section className="mx-auto max-w-[1380px] px-10 pb-20">
        <div className="w-full overflow-hidden rounded border border-[#e5e5e5] shadow-sm">
          <iframe
            src="https://www.google.com/maps?q=Av.+25+de+Setembro+1123,+Maputo,+Mozambique&output=embed"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Localização da Rentu no Google Maps"
          ></iframe>
        </div>
      </section>

      {/* FOOTER DO LAYOUT MÃE */}
      <RentuFooter />
    </main>
  );
}