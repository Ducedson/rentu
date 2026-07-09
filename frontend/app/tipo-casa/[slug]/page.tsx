"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBath, FaBed } from "react-icons/fa";
import { FiArrowLeft, FiMapPin } from "react-icons/fi";
import { getProperty, Property } from "@/lib/api";
import { formatPropertyPrice, getPropertyCover, getPropertyTypeLabel } from "@/lib/properties-ui";
import { RentuFooter, RentuHeader } from "../../components/rentu-chrome";

export default function TipoCasaDetailFallbackPage() {
  const params = useParams();
  const id = params.slug as string;
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProperty(id)
      .then(setProperty)
      .catch(() => setProperty(null))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <main className="min-h-screen bg-white text-black">
      <RentuHeader />
      <section className="mx-auto max-w-[1180px] px-10 py-10">
        <Link className="mb-6 inline-flex items-center gap-2 font-bold text-gray-600 hover:text-[#f0442b]" href="/tipo-casa">
          <FiArrowLeft /> Voltar aos tipos de casa
        </Link>

        {loading ? (
          <p className="rounded bg-[#f8f8f8] p-8 text-center font-bold">A carregar imovel...</p>
        ) : !property ? (
          <div className="rounded border border-dashed p-10 text-center">
            <h1 className="text-2xl font-black">Imovel nao encontrado</h1>
            <Link className="mt-5 inline-flex rounded bg-[#f0442b] px-6 py-3 font-black text-white" href="/tipo-casa">
              Ver todos os imoveis
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded border bg-white shadow-sm">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
              <div className="min-h-[420px] bg-cover bg-center" style={{ backgroundImage: `url(${getPropertyCover(property)})` }} />
              <div className="p-8">
                <span className="rounded bg-[#fee2dd] px-2 py-1 text-xs font-black text-[#f0442b]">
                  {getPropertyTypeLabel(property.type)}
                </span>
                <h1 className="mt-4 text-3xl font-black">{property.title}</h1>
                <p className="mt-3 flex items-center gap-2 font-semibold text-gray-600">
                  <FiMapPin /> {property.city}{property.district ? `, ${property.district}` : ""}
                </p>
                <p className="mt-5 text-2xl font-black text-[#f0442b]">{formatPropertyPrice(property)}</p>
                <div className="mt-6 flex gap-5 border-y py-5 font-bold text-gray-600">
                  <span className="flex items-center gap-2"><FaBed /> {property.bedrooms || 0} quartos</span>
                  <span className="flex items-center gap-2"><FaBath /> {property.bathrooms || 0} banhos</span>
                </div>
                <p className="mt-6 whitespace-pre-line leading-7 text-gray-700">{property.description}</p>
                <Link className="mt-8 inline-flex w-full justify-center rounded bg-[#f0442b] px-5 py-3 font-black text-white" href={`/imovel/${property.id}`}>
                  Abrir descricao completa
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
      <RentuFooter />
    </main>
  );
}
