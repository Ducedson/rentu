"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBath, FaBed } from "react-icons/fa";
import { FiBriefcase, FiHeart, FiHome, FiMaximize2, FiSearch, FiSliders, FiUser } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { RentuFooter, RentuHeader } from "./components/rentu-chrome";
import { getProperties, Property } from "@/lib/api";
import {
  formatPropertyPrice,
  getPropertyCover,
  getPropertyTypeLabel,
  PROPERTY_TYPE_OPTIONS,
} from "@/lib/properties-ui";

export default function Home() {
  const router = useRouter();
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    getProperties().then((data) => setProperties(data.slice(0, 6))).catch(() => setProperties([]));
  }, []);

  const runSearch = () => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (type) params.set("tipo", type);
    router.push(`/tipo-casa${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <RentuHeader />

      <section className="mx-auto max-w-[1380px] px-4 pt-4 sm:px-6 lg:px-10 lg:pt-6">
        <div
          className="relative flex min-h-[520px] items-center justify-center overflow-hidden bg-cover bg-center text-white sm:min-h-[565px]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,.42), rgba(0,0,0,.42)), url(/assets/kuvu.jpg)",
          }}
        >
          <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center px-4 text-center sm:px-6">
            <h1 className="text-4xl font-black leading-tight sm:text-[46px] md:text-[52px]">
              Procurando Imovel Para Arrendar?
            </h1>
            <p className="mt-5 max-w-[980px] text-lg font-extrabold leading-snug sm:mt-6 sm:text-[25px]">
              A Rentu disponibiliza casas, flats e escritorios confortaveis para habitacao provisoria e empreendimento.
            </p>

            <form
              className="mt-8 grid w-full max-w-[820px] gap-3 rounded bg-white p-3 shadow-2xl sm:mt-12 sm:flex sm:items-center"
              onSubmit={(event) => {
                event.preventDefault();
                runSearch();
              }}
            >
              <input
                className="h-12 min-w-0 flex-1 rounded border border-gray-100 px-3 text-base font-medium text-[#555] outline-none sm:border-0 sm:px-4 sm:text-[18px]"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Pesquise por cidade, bairro ou tipo de imovel..."
                value={query}
              />
              <button
                className="grid size-12 place-items-center rounded bg-[#fee2dd] text-[#f0442b] sm:mr-4"
                type="button"
                aria-label="Filtros"
                aria-expanded={advancedOpen}
                onClick={() => setAdvancedOpen((open) => !open)}
              >
                <FiSliders className="text-2xl" aria-hidden />
              </button>
              <button className="flex h-12 items-center justify-center gap-3 rounded bg-[#f0442b] px-5 text-base font-extrabold text-white sm:text-[18px]" type="submit">
                Pesquisar <FiSearch className="text-xl" aria-hidden />
              </button>
            </form>

            {advancedOpen ? (
              <div className="mt-3 w-full max-w-[720px] rounded border border-[#cfcfcf] bg-white p-4 text-left text-black shadow-[0_2px_6px_rgba(0,0,0,0.18)]">
                <p className="mb-3 text-sm font-black uppercase text-gray-500">Tipo de imovel</p>
                <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
                  <button
                    className={`rounded border px-3 py-2 text-left text-sm font-black ${!type ? "border-[#f0442b] bg-[#fee2dd]" : ""}`}
                    onClick={() => setType("")}
                    type="button"
                  >
                    Todos
                  </button>
                  {PROPERTY_TYPE_OPTIONS.map((option) => (
                    <button
                      className={`rounded border px-3 py-2 text-left text-sm font-black ${type === option.value ? "border-[#f0442b] bg-[#fee2dd]" : ""}`}
                      key={option.value}
                      onClick={() => setType(option.value)}
                      type="button"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link href="/tipo-casa?tipo=HOUSE" className="flex h-11 min-w-32 items-center justify-center gap-2 rounded-full bg-black/60 px-8 text-[16px] font-extrabold backdrop-blur">
                <FiHome className="text-xl" aria-hidden />
                Casas
              </Link>
              <Link href="/tipo-casa?tipo=OFFICE" className="flex h-11 min-w-36 items-center justify-center gap-2 rounded-full bg-black/60 px-8 text-[16px] font-extrabold backdrop-blur">
                <FiBriefcase className="text-xl" aria-hidden />
                Escritorios
              </Link>
              <Link href="/tipo-casa?tipo=APARTMENT" className="flex h-11 min-w-32 items-center justify-center gap-2 rounded-full bg-black/60 px-8 text-[16px] font-extrabold backdrop-blur">
                <HiOutlineBuildingOffice2 className="text-xl" aria-hidden />
                Flats
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1380px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-black sm:text-[48px]">Casas Mais Recentes</h2>
          <p className="mt-4 text-base font-extrabold text-[#6d6d6d] sm:mt-5 sm:text-[21px]">
            Imóveis publicados e prontos para visita no Website.
          </p>
        </div>

        {properties.length === 0 ? (
          <div className="rounded border border-dashed p-10 text-center font-bold text-gray-600">
            Nenhum imóvel publicado ainda.
          </div>
        ) : (
          <div className="grid gap-x-7 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
            {properties.map((property) => (
              <article className="overflow-hidden bg-white shadow-[0_2px_5px_rgba(0,0,0,0.25)]" key={property.id}>
                <div className="relative h-64 bg-cover bg-center sm:h-[320px]" style={{ backgroundImage: `url(${getPropertyCover(property)})` }}>
                  <span className="absolute left-4 top-5 rounded bg-[#f0442b] px-4 py-2 text-[15px] font-bold text-white">
                    Disponivel
                  </span>
                  <span className="absolute left-4 top-16 rounded bg-black/55 px-3 py-1 text-xs font-black text-white">
                    {getPropertyTypeLabel(property.type)}
                  </span>
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <Link className="grid size-9 place-items-center rounded bg-black/35 text-white backdrop-blur" aria-label="Abrir imovel" href={`/imovel/${property.id}`}>
                      <FiMaximize2 aria-hidden />
                    </Link>
                    <button className="grid size-9 place-items-center rounded bg-black/35 text-white backdrop-blur" aria-label="Guardar imovel">
                      <FiHeart aria-hidden />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-[21px] font-black">Preco: {formatPropertyPrice(property)}</h3>
                  <p className="mt-4 text-[18px] font-bold text-[#7a7a7a]">
                    {property.city}{property.district ? `, ${property.district}` : ""}
                  </p>
                  <div className="mt-7 flex flex-wrap items-center gap-4 sm:gap-5">
                    <span className="flex items-center gap-2 font-black"><FaBed /> {property.bedrooms || 0} Quartos</span>
                    <span className="h-8 w-px bg-[#a9a9a9]" />
                    <span className="flex items-center gap-2 font-black"><FaBath /> {property.bathrooms || 0} Banhos</span>
                  </div>
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3 text-[#777]">
                      <FiUser className="text-2xl text-black" aria-hidden />
                      <span className="text-[16px] font-bold">{property.owner?.name || "Rentu"}</span>
                    </div>
                    <Link className="rounded bg-[#f0442b] px-5 py-3 text-[17px] font-extrabold text-white" href={`/imovel/${property.id}`}>
                      Contactar
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <Link className="inline-flex h-14 items-center justify-center rounded bg-[#f0442b] px-12 text-[18px] font-extrabold text-white" href="/tipo-casa">
            Ver todos
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1380px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-black leading-tight sm:text-[44px]">
              A Sua Comodidade,<br />E A Nossa Satisfação
            </h2>
            <p className="mt-2 text-[18px] font-medium text-[#6d6d6d]">
              Descubra o melhor que a Rentu oferece.
            </p>
          </div>
        </div>

        <div className="grid items-start gap-x-7 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
          {properties.slice(0, 3).map((property, index) => (
            <article
              className={`h-fit overflow-hidden rounded-lg border border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] ${
                index === 1 ? "xl:mt-24" : ""
              } ${index === 2 ? "xl:mt-48" : ""}`}
              key={`comodidade-${property.id}`}
            >
              <div className="relative h-64 bg-cover bg-center sm:h-[310px]" style={{ backgroundImage: `url(${getPropertyCover(property)})` }}>
                <span className="absolute left-4 top-4 rounded bg-[#f0442b] px-3 py-1 text-[14px] font-bold uppercase tracking-wider text-white">
                  Disponivel
                </span>
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <Link className="grid size-9 place-items-center rounded bg-black/45 text-white backdrop-blur" href={`/imovel/${property.id}`} aria-label="Abrir imagem">
                    <FiMaximize2 size={18} />
                  </Link>
                  <button className="grid size-9 place-items-center rounded bg-black/45 text-white backdrop-blur" aria-label="Favoritar">
                    <FiHeart size={18} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <p className="text-[20px] font-black text-[#111]">Preco: {formatPropertyPrice(property)}</p>
                <p className="mt-1 text-[15px] font-bold text-[#6d6d6d]">
                  {property.city}{property.district ? `, ${property.district}` : ""}
                </p>
                <div className="mt-6 flex items-center gap-6 border-b border-gray-100 pb-5 text-[#555]">
                  <div className="flex items-center gap-2">
                    <FaBed className="text-xl text-[#f0442b]" />
                    <span className="text-[15px] font-bold">
                      {property.bedrooms || 0} <span className="block text-[12px] font-medium text-gray-400">Quartos</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaBath className="text-lg text-[#f0442b]" />
                    <span className="text-[15px] font-bold">
                      {property.bathrooms || 0} <span className="block text-[12px] font-medium text-gray-400">Banheiro</span>
                    </span>
                  </div>
                </div>
                <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 text-[15px] font-bold text-[#444]">
                    <FiUser className="text-lg text-gray-400" />
                    <span>{property.owner?.name || "Rentu"}</span>
                  </div>
                  <Link
                    href={`/imovel/${property.id}`}
                    className="inline-flex h-10 items-center justify-center rounded bg-[#f0442b] px-5 text-[15px] font-extrabold text-white hover:bg-[#d6341d]"
                  >
                    Contactar
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <RentuFooter />
    </main>
  );
}
