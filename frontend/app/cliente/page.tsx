"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBath, FaBed } from "react-icons/fa";
import { FiHome, FiSearch, FiUser } from "react-icons/fi";
import { ProtectedClientRoute } from "@/components/protected-route";
import { getProperties, Property } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { formatPropertyPrice, getPropertyCover } from "@/lib/properties-ui";
import { RentuHeader } from "../components/rentu-chrome";

export default function ClientDashboardPage() {
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    getProperties().then(setProperties).catch(() => setProperties([]));
  }, []);

  return (
    <ProtectedClientRoute>
      <main className="min-h-screen bg-white text-black">
        <RentuHeader />
        <section className="mx-auto max-w-[1380px] px-10 py-10">
          <div className="mb-8 flex flex-col justify-between gap-5 rounded bg-[#f8f8f8] p-7 md:flex-row md:items-center">
            <div>
              <p className="flex items-center gap-2 text-sm font-black uppercase text-[#f0442b]">
                <FiUser /> Dashboard do cliente
              </p>
              <h1 className="mt-2 text-3xl font-black">Bem-vindo, {user?.name}</h1>
              <p className="mt-2 font-semibold text-gray-600">
                Encontre casas, flats e escritorios disponiveis no CgWebsite.
              </p>
            </div>
            <Link className="inline-flex h-12 items-center gap-2 rounded bg-[#f0442b] px-6 font-black text-white" href="/tipo-casa">
              <FiSearch /> Procurar imoveis
            </Link>
          </div>

          <div className="mb-8 grid gap-5 md:grid-cols-3">
            <Summary title="Imoveis disponiveis" value={properties.length} />
            <Summary title="Casas" value={properties.filter((item) => item.type === "HOUSE").length} />
            <Summary title="Flats" value={properties.filter((item) => item.type === "APARTMENT").length} />
          </div>

          <h2 className="mb-5 text-2xl font-black">Sugestoes recentes</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {properties.slice(0, 8).map((property) => (
              <Link className="block rounded border bg-white p-3 transition hover:shadow-lg" href={`/imovel/${property.id}`} key={property.id}>
                <div className="h-40 rounded bg-cover bg-center" style={{ backgroundImage: `url(${getPropertyCover(property)})` }} />
                <p className="mt-3 text-lg font-black">{formatPropertyPrice(property)}</p>
                <p className="mt-1 text-sm font-bold text-gray-600">{property.city}</p>
                <div className="mt-3 flex gap-4 text-sm font-bold text-gray-600">
                  <span className="flex items-center gap-1"><FaBed /> {property.bedrooms || 0}</span>
                  <span className="flex items-center gap-1"><FaBath /> {property.bathrooms || 0}</span>
                </div>
              </Link>
            ))}
          </div>

          {properties.length === 0 ? (
            <div className="rounded border border-dashed p-10 text-center">
              <FiHome className="mx-auto mb-3 text-4xl text-[#f0442b]" />
              <p className="font-bold text-gray-600">Ainda nao existem imoveis publicados.</p>
            </div>
          ) : null}
        </section>
      </main>
    </ProtectedClientRoute>
  );
}

function Summary({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded bg-[#f8f8f8] p-5">
      <p className="text-sm font-bold text-gray-500">{title}</p>
      <p className="mt-2 text-3xl font-black">{value}</p>
    </div>
  );
}
