"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiCheckCircle, FiClock, FiHome, FiPlusCircle } from "react-icons/fi";
import { ProtectedAgentRoute } from "@/components/protected-route";
import { getMyProperties, Property } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { formatPropertyPrice, getPropertyCover, STATUS_LABELS } from "@/lib/properties-ui";
import { RentuHeader } from "../components/rentu-chrome";

export default function AgentDashboardPage() {
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyProperties()
      .then(setProperties)
      .catch(() => setProperties([]))
      .finally(() => setLoading(false));
  }, []);

  const pending = properties.filter((property) => property.status === "DRAFT").length;
  const published = properties.filter((property) => property.status === "PUBLISHED").length;

  return (
    <ProtectedAgentRoute>
      <main className="min-h-screen bg-white text-black">
        <RentuHeader />
        <section className="mx-auto max-w-[1380px] px-10 py-10">
          <div className="mb-8 flex flex-col justify-between gap-5 rounded bg-[#f8f8f8] p-7 md:flex-row md:items-center">
            <div>
              <p className="flex items-center gap-2 text-sm font-black uppercase text-[#f0442b]">
                <FiHome /> Dashboard do intermediario
              </p>
              <h1 className="mt-2 text-3xl font-black">Ola, {user?.name}</h1>
              <p className="mt-2 font-semibold text-gray-600">
                Acompanhe as casas submetidas e o estado de aprovacao pelo admin.
              </p>
            </div>
            <Link className="inline-flex h-12 items-center gap-2 rounded bg-[#f0442b] px-6 font-black text-white" href="/adicionar-casa">
              <FiPlusCircle /> Adicionar casa
            </Link>
          </div>

          <div className="mb-8 grid gap-5 md:grid-cols-3">
            <Summary icon={<FiHome />} title="Total submetidas" value={properties.length} />
            <Summary icon={<FiClock />} title="Em aprovacao" value={pending} />
            <Summary icon={<FiCheckCircle />} title="Publicadas" value={published} />
          </div>

          <h2 className="mb-5 text-2xl font-black">Minhas casas</h2>
          {loading ? (
            <p className="rounded bg-[#f8f8f8] p-8 text-center font-bold">A carregar casas...</p>
          ) : properties.length === 0 ? (
            <div className="rounded border border-dashed p-10 text-center">
              <FiHome className="mx-auto mb-3 text-4xl text-[#f0442b]" />
              <p className="font-bold text-gray-600">Ainda nao submeteu nenhuma casa.</p>
              <Link className="mt-5 inline-flex rounded bg-[#f0442b] px-6 py-3 font-black text-white" href="/adicionar-casa">
                Adicionar primeira casa
              </Link>
            </div>
          ) : (
            <div className="overflow-hidden rounded border bg-white">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-4 text-left font-black">Imovel</th>
                    <th className="px-5 py-4 text-left font-black">Preco</th>
                    <th className="px-5 py-4 text-left font-black">Estado</th>
                    <th className="px-5 py-4 text-left font-black">Notificacao</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((property) => (
                    <tr className="border-t" key={property.id}>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-14 rounded bg-cover bg-center" style={{ backgroundImage: `url(${getPropertyCover(property)})` }} />
                          <div>
                            <p className="font-black">{property.title}</p>
                            <p className="text-sm font-semibold text-gray-500">{property.city}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 font-bold">{formatPropertyPrice(property)}</td>
                      <td className="px-5 py-4">
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-800">
                          {STATUS_LABELS[property.status] || property.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm font-semibold text-gray-600">
                        {property.status === "PUBLISHED"
                          ? "Aprovada pelo admin e visivel no site."
                          : property.status === "DRAFT"
                            ? "ProcessingInstruction de aprovacao: aguardando revisao do admin."
                            : "Atualizada pelo admin."}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </ProtectedAgentRoute>
  );
}

function Summary({ icon, title, value }: { icon: React.ReactNode; title: string; value: number }) {
  return (
    <div className="rounded bg-[#f8f8f8] p-5">
      <div className="mb-3 text-2xl text-[#f0442b]">{icon}</div>
      <p className="text-sm font-bold text-gray-500">{title}</p>
      <p className="mt-2 text-3xl font-black">{value}</p>
    </div>
  );
}
