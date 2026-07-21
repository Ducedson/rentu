"use client";

import Link from "next/link";
import {
  FiChevronDown,
  FiHome,
  FiPhone,
  FiUser,
  FiAward,
  FiTarget,
  FiEye,
  FiCheckCircle,
} from "react-icons/fi";
import { RentuFooter } from "../components/rentu-chrome"; 

export default function SobreNos() {
  const valores = [
    "Acessibilidade",
    "Simplicidade",
    "Inclusão",
    "Inovação Local",
    "Transparência",
    "Ética",
  ];

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
            <Link className="flex items-center gap-2 text-[#f0442b]" href="/sobre-nos">
              Sobre Nós 
            </Link>
            <Link className="flex items-center gap-2" href="/contacto">
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

      {/* HERO SECTION DE SOBRE NÓS */}
      <section className="mx-auto max-w-[1380px] px-10 pt-6">
        <div
          className="relative flex min-h-[380px] items-center justify-center overflow-hidden bg-cover bg-center text-white"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,.60), rgba(0,0,0,.60)), url(/assets/kuvu.jpg)",
          }}
        >
          <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center px-6 text-center">
            <h1 className="text-[46px] font-black leading-tight tracking-[-1px] md:text-[54px]">
              Sobre Nós
            </h1>
            <p className="mt-6 max-w-[800px] bg-[#f0442b] px-6 py-3 text-[20px] md:text-[24px] font-black italic tracking-wide rounded shadow-lg">
              &quot;A Rentu é o teu lar provisório ao preço do teu bolso.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* QUEM SOMOS - CONTEÚDO PRINCIPAL */}
      <section className="mx-auto max-w-[1120px] px-10 py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-12">
            <h2 className="text-[40px] font-black tracking-[-1px] mb-6">
              Sobre Nós
            </h2>
            <div className="text-[19px] font-medium leading-relaxed text-[#333333] space-y-6">
              <p>
                A Rentu nasceu da necessidade de simplificar uma das jornadas mais
                importantes na vida de qualquer pessoa que busca por um lar via
                arrendamento e com base no seu orçamento. Percebemos que, nas cidades
                de Maputo e Matola, assim como nas cidades das outras províncias,
                existe uma grande parte do mercado de arrendamento acessível,
                especialmente nos bairros periféricos, que opera de forma informal, o
                que tem tornado a busca por casas nos bairros e flats de baixo e médio
                custo uma tarefa complexa e desgastante.
              </p>
              <p>
                A nossa plataforma foi concebida para ser a ponte que faltava.
                Conectamos de maneira prática e segura os intermediários informais, que
                detêm o conhecimento local e as oportunidades de habitação, aos
                potenciais arrendatários que procuram uma solução digna dentro do seu
                orçamento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* O QUE FAZEMOS */}
      <section className="bg-[#f9f9f9] border-y border-[#efefef] py-16">
        <div className="mx-auto max-w-[1380px] px-10">
          <div className="mb-14 text-center max-w-[900px] mx-auto">
            <h2 className="text-[42px] font-black tracking-[-1px]">O que Fazemos</h2>
            <p className="mt-4 text-[21px] font-bold text-[#6d6d6d] leading-snug">
              Na Rentu, somos a ligação digital essencial entre quem procura casa e
              quem oferece oportunidades de arrendamento acessível. Especializamo-nos
              no coração do mercado habitacional real dos bairros periféricos das
              cidades de Maputo e Matola.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                num: "1",
                title: "Organizamos o Mercado Informal",
                desc: "Damos visibilidade e estrutura às ofertas de casas e flats de baixo e médio custo, que muitas vezes circulam apenas por boca a boca, ou em redes sociais, destacando-se mais o Facebook, e nós, tornamos esse processo facilmente pesquisável e acessível num só lugar.",
              },
              {
                num: "2",
                title: "Conectamos Pessoas com Oportunidades",
                desc: "Facilitamos o contacto direto e seguro entre potenciais arrendatários e os intermediários informais, que são peças-chave no ecossistema de arrendamento local e detêm o conhecimento das melhores oportunidades de casas que se adaptam às necessidades dos clientes.",
              },
              {
                num: "3",
                title: "Simplificamos a Busca",
                desc: "Oferecemos ferramentas de filtro e busca que permitem encontrar casas com base em critérios essenciais como localização (bairro), preço, número de quartos e tipo de imóvel (casa ou flat), poupando tempo e esforço na procura.",
              },
              {
                num: "4",
                title: "Focamos no Essencial",
                desc: "O nosso compromisso é com a habitação acessível e digna. Centramos os nossos esforços em listagens que respondam às necessidades da maioria, promovendo a inclusão e facilitando o acesso a um lar sem complicações.",
              },
            ].map((item) => (
              <div
                key={item.num}
                className="bg-white p-8 rounded border border-[#e5e5e5] shadow-[0_2px_4px_rgba(0,0,0,0.04)] flex gap-5"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded bg-[#fee2dd] text-[22px] font-black text-[#f0442b]">
                  {item.num}
                </span>
                <div>
                  <h3 className="text-[22px] font-black mb-3">{item.title}</h3>
                  <p className="text-[17px] font-medium text-[#555555] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          
        </div>
      </section>

      {/* MISSÃO, VISÃO E VALORES */}
      <section className="mx-auto max-w-[1380px] px-10 py-20">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Missão */}
          <div className="border border-[#e5e5e5] p-8 rounded bg-white shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 text-[#f0442b] mb-5">
                <FiTarget className="text-3xl" />
                <h3 className="text-[24px] font-black text-black">Nossa Missão</h3>
              </div>
              <p className="text-[18px] font-medium text-[#444444] leading-relaxed">
                Facilitar o acesso à habitação de forma acessível nas cidades de Maputo
                e Matola, conectando de forma simples, rápida e confiável os
                arrendatários a intermediários informais e a oportunidades de casas e
                flats de baixo e médio custo nos bairros periféricos.
              </p>
            </div>
          </div>

          {/* Visão */}
          <div className="border border-[#e5e5e5] p-8 rounded bg-white shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 text-[#f0442b] mb-5">
                <FiEye className="text-3xl" />
                <h3 className="text-[24px] font-black text-black">Nossa Visão</h3>
              </div>
              <p className="text-[18px] font-medium text-[#444444] leading-relaxed">
                Ser a plataforma líder e de maior confiança no mercado de
                arrendamento acessível em todo Moçambique, transformando a forma como
                as pessoas encontram casas, promovendo a inclusão e a transparência no
                setor imobiliário informal.
              </p>
            </div>
          </div>

          {/* Valores */}
          <div className="border border-[#e5e5e5] p-8 rounded bg-white shadow-sm">
            <div className="flex items-center gap-3 text-[#f0442b] mb-5">
              <FiAward className="text-3xl" />
              <h3 className="text-[24px] font-black text-black">Nossos Valores</h3>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {valores.map((valor) => (
                <li
                  key={valor}
                  className="flex items-center gap-2 text-[17px] font-extrabold text-[#111111]"
                >
                  <FiCheckCircle className="text-[#f0442b] shrink-0 text-lg" />
                  {valor}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
<div className="mt-12 bg-white border-2 border-dashed border-[#f0442b] p-8 text-center max-w-[900px] mx-auto rounded">
            <p className="text-[20px] font-black text-[#111111] leading-snug">
              &quot;Em suma, transformamos um processo tradicionalmente fragmentado e complexo numa experiência digital simples, eficiente e focada nas reais necessidades do mercado moçambicano.&quot;
            </p>
            <p className="mt-4 text-[18px] font-extrabold text-[#f0442b]">
              Na Rentu, não prestamos serviços de arrendamento de casas, simplificamos a maneira de encontrá-las.
            </p>
          </div>
      {/* FOOTER DO LAYOUT MÃE */}
      <RentuFooter />
    </main>
  );
}
