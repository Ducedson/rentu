"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { FaBath, FaBed } from "react-icons/fa";
import { FiHome, FiMapPin, FiSearch } from "react-icons/fi";
import { RentuFooter, RentuHeader } from "../components/rentu-chrome";
import { getProperties, Property } from "@/lib/api";
import {
  formatPropertyPrice,
  getPropertyCover,
  getPropertyTypeLabel,
  PROPERTY_TYPE_OPTIONS,
} from "@/lib/properties-ui";

export default function TipoCasaPage() {
  return (
    <Suspense fallback={<TipoCasaLoading />}>
      <TipoCasaContent />
    </Suspense>
  );
}

function TipoCasaContent() {
  const searchParams = useSearchParams();
  const selectedType = searchParams.get("tipo") || "";
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProperties({
      type: selectedType || undefined,
      q: initialQuery || undefined,
    })
      .then(setProperties)
      .catch(() => setProperties([]))
      .finally(() => setLoading(false));
  }, [selectedType, initialQuery]);

  const resultLabel = useMemo(() => {
    if (selectedType) return getPropertyTypeLabel(selectedType);
    return "Todos os imoveis";
  }, [selectedType]);

  return (
    <main className="min-h-screen bg-white text-black">
      <RentuHeader />
      <section className="mx-auto max-w-[1380px] px-10 py-10">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-black uppercase text-[#f0442b]">Tipo de casa</p>
          <h1 className="mt-3 text-4xl font-black">Casas existentes no Website</h1>
          <p className="mt-4 text-lg font-semibold text-gray-600">
            Veja casas, flats, escritorios e outros imoveis disponiveis. Clique em cada imóvel para abrir a descrição completa.
          </p>
        </div>

        <form className="mb-6 flex max-w-2xl gap-3" action="/tipo-casa">
          {selectedType ? <input name="tipo" type="hidden" value={selectedType} /> : null}
          <input
            className="h-12 flex-1 rounded border px-4 outline-[#f0442b]"
            name="q"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Pesquisar por cidade, bairro ou titulo..."
            value={query}
          />
          <button className="flex h-12 items-center gap-2 rounded bg-[#f0442b] px-5 font-black text-white" type="submit">
            <FiSearch /> Pesquisar
          </button>
        </form>

        <div className="mb-8 flex flex-wrap gap-2">
          <Link className={`rounded border px-4 py-2 font-bold ${!selectedType ? "border-[#f0442b] bg-[#f0442b] text-white" : "bg-white"}`} href="/tipo-casa">
            Todos
          </Link>
          {PROPERTY_TYPE_OPTIONS.map((type) => (
            <Link
              className={`rounded border px-4 py-2 font-bold ${
                selectedType === type.value ? "border-[#f0442b] bg-[#f0442b] text-white" : "bg-white"
              }`}
              href={`/tipo-casa?tipo=${type.value}`}
              key={type.value}
            >
              {type.label}
            </Link>
          ))}
        </div>

        <p className="mb-6 font-bold text-gray-600">
          {loading ? "A carregar..." : `${properties.length} resultado(s) em ${resultLabel}`}
        </p>

        {!loading && properties.length === 0 ? (
          <div className="rounded border border-dashed p-10 text-center">
            <FiHome className="mx-auto mb-3 text-4xl text-[#f0442b]" />
            <h2 className="text-xl font-black">Nenhum imóvel encontrado</h2>
            <p className="mt-2 font-semibold text-gray-600">Tente outro tipo ou apague a pesquisa.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {properties.map((property) => (
              <Link className="group overflow-hidden rounded border bg-white shadow-sm transition hover:shadow-lg" href={`/imovel/${property.id}`} key={property.id}>
                <div className="h-48 bg-cover bg-center transition group-hover:scale-[1.02]" style={{ backgroundImage: `url(${getPropertyCover(property)})` }} />
                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="rounded bg-[#fee2dd] px-2 py-1 text-xs font-black text-[#f0442b]">
                      {getPropertyTypeLabel(property.type)}
                    </span>
                    <span className="text-sm font-black">{formatPropertyPrice(property)}</span>
                  </div>
                  <h2 className="text-lg font-black">{property.title}</h2>
                  <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-gray-600">
                    <FiMapPin /> {property.city}{property.district ? `, ${property.district}` : ""}
                  </p>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">{property.description}</p>
                  <div className="mt-4 flex gap-4 border-t pt-4 text-sm font-bold text-gray-600">
                    <span className="flex items-center gap-1"><FaBed /> {property.bedrooms || 0} quartos</span>
                    <span className="flex items-center gap-1"><FaBath /> {property.bathrooms || 0} banhos</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
      <RentuFooter />
    </main>
  );
}

function TipoCasaLoading() {
  return (
    <main className="min-h-screen bg-white text-black">
      <RentuHeader />
      <section className="mx-auto max-w-[1380px] px-10 py-10">
        <p className="rounded bg-[#f8f8f8] p-8 text-center font-bold">A carregar imóveis...</p>
      </section>
      <RentuFooter />
    </main>
  );
}
