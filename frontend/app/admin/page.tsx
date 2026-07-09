"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FiArrowRight, FiCheck, FiClock, FiMapPin, FiTrendingUp } from "react-icons/fi";
import { AdminHeader } from "@/components/admin/header";
import { AdminSidebar } from "@/components/admin/sidebar";
import { StatCard } from "@/components/admin/stat-card";
import { ProtectedAdminRoute } from "@/components/protected-route";
import { getAllProperties } from "@/lib/admin";
import { Property } from "@/lib/api";

const statusLabels: Record<string, string> = {
  DRAFT: "Rascunho",
  PUBLISHED: "Publicado",
  ARCHIVED: "Arquivado",
  RESERVED: "Reservado",
  SOLD: "Vendido",
  RENTED: "Arrendado",
};

const statusColors: Record<string, string> = {
  DRAFT: "bg-gray-100 text-gray-800",
  PUBLISHED: "bg-green-100 text-green-800",
  ARCHIVED: "bg-red-100 text-red-800",
  RESERVED: "bg-blue-100 text-blue-800",
  SOLD: "bg-purple-100 text-purple-800",
  RENTED: "bg-amber-100 text-amber-800",
};

function formatPrice(property: Property) {
  return new Intl.NumberFormat("pt-MZ", {
    style: "currency",
    currency: property.currency || "MZN",
    maximumFractionDigits: 0,
  }).format(Number(property.price));
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-MZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

function getErrorMessage(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "data" in error.response &&
    typeof error.response.data === "object" &&
    error.response.data !== null &&
    "message" in error.response.data &&
    typeof error.response.data.message === "string"
  ) {
    return error.response.data.message;
  }

  return "Erro ao carregar dados do dashboard";
}

export default function AdminDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProperties() {
      try {
        setLoading(true);
        setProperties(await getAllProperties());
        setError("");
      } catch (err: unknown) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }

    loadProperties();
  }, []);

  const stats = useMemo(() => {
    const published = properties.filter((property) => property.status === "PUBLISHED").length;
    const drafts = properties.filter((property) => property.status === "DRAFT").length;
    const archived = properties.filter((property) => property.status === "ARCHIVED").length;
    const withImages = properties.filter((property) => property.images?.length > 0).length;

    return { published, drafts, archived, withImages };
  }, [properties]);

  const statusSummary = useMemo(() => {
    const counts = properties.reduce<Record<string, number>>((acc, property) => {
      acc[property.status] = (acc[property.status] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts).sort(([, a], [, b]) => b - a);
  }, [properties]);

  const recentProperties = properties.slice(0, 5);

  return (
    <ProtectedAdminRoute>
      <div className="flex bg-gray-50">
        <AdminSidebar />

        <div className="flex-1 lg:ml-64">
          <AdminHeader />

          <main className="p-8">
            {error && (
              <div className="mb-6 rounded border border-red-200 bg-red-50 p-4 text-red-700">
                {error}
              </div>
            )}

            <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                icon={<FiMapPin />}
                number={properties.length}
                title="Total de Imoveis"
                subtitle={loading ? "Carregando..." : "Propriedades cadastradas"}
                color="blue"
              />
              <StatCard
                icon={<FiCheck />}
                number={stats.published}
                title="Publicados"
                subtitle="Visiveis no site publico"
                color="green"
              />
              <StatCard
                icon={<FiClock />}
                number={stats.drafts}
                title="Rascunhos"
                subtitle="Aguardando publicacao"
                color="orange"
              />
              <StatCard
                icon={<FiTrendingUp />}
                number={stats.withImages}
                title="Com Imagens"
                subtitle="Imoveis com galeria"
                color="red"
              />
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              <section className="rounded-lg bg-white p-6 shadow lg:col-span-2">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-black text-gray-900">Imoveis Recentes</h2>
                    <p className="text-sm text-gray-500">Ultimas propriedades cadastradas</p>
                  </div>
                  <Link
                    href="/admin/properties"
                    className="flex items-center gap-1 text-sm font-bold text-[#f0442b] hover:underline"
                  >
                    Ver todos <FiArrowRight size={16} />
                  </Link>
                </div>

                {loading ? (
                  <p className="py-8 text-center font-medium text-gray-600">Carregando imoveis...</p>
                ) : recentProperties.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="mb-4 text-gray-600">Nenhum imovel cadastrado ainda.</p>
                    <Link
                      href="/admin/properties/create"
                      className="inline-flex rounded-lg bg-[#f0442b] px-5 py-2 font-bold text-white hover:bg-[#d63220]"
                    >
                      Criar Propriedade
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="px-4 py-3 text-left font-bold text-gray-600">Titulo</th>
                          <th className="px-4 py-3 text-left font-bold text-gray-600">Cidade</th>
                          <th className="px-4 py-3 text-left font-bold text-gray-600">Preco</th>
                          <th className="px-4 py-3 text-left font-bold text-gray-600">Status</th>
                          <th className="px-4 py-3 text-left font-bold text-gray-600">Data</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentProperties.map((property) => (
                          <tr key={property.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="px-4 py-3 font-bold text-gray-900">
                              <Link href={`/admin/properties/${property.id}`} className="hover:text-[#f0442b]">
                                {property.title}
                              </Link>
                            </td>
                            <td className="px-4 py-3 text-gray-600">{property.city}</td>
                            <td className="px-4 py-3 text-gray-600">{formatPrice(property)}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-bold ${
                                  statusColors[property.status] || "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {statusLabels[property.status] || property.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-600">{formatDate(property.createdAt)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>

              <section className="rounded-lg bg-white p-6 shadow">
                <div className="mb-6 flex items-center gap-2">
                  <FiTrendingUp className="text-[#f0442b]" />
                  <h3 className="text-lg font-black text-gray-900">Imoveis por Status</h3>
                </div>

                {statusSummary.length === 0 ? (
                  <p className="text-sm text-gray-500">Sem dados para mostrar.</p>
                ) : (
                  <div className="space-y-4">
                    {statusSummary.map(([status, count]) => (
                      <div key={status}>
                        <div className="mb-1 flex justify-between">
                          <span className="text-sm font-bold text-gray-700">
                            {statusLabels[status] || status}
                          </span>
                          <span className="text-sm font-bold text-gray-900">{count}</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-[#f0442b]"
                            style={{ width: `${Math.max((count / properties.length) * 100, 5)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-8 rounded-lg bg-gray-50 p-4">
                  <p className="text-sm font-bold text-gray-900">Arquivados</p>
                  <p className="mt-1 text-2xl font-black text-gray-900">{stats.archived}</p>
                  <p className="mt-1 text-xs text-gray-500">Ocultos no site publico</p>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </ProtectedAdminRoute>
  );
}
