"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { getAllProperties, deleteProperty, updateProperty } from "@/lib/admin";
import { Property } from "@/lib/api";
import { ProtectedAdminRoute } from "@/components/protected-route";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from "react-icons/fi";

function getErrorMessage(error: unknown, fallback: string) {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "data" in error.response &&
    typeof error.response.data === "object" &&
    error.response.data !== null &&
    "message" in error.response.data
  ) {
    const message = error.response.data.message;
    if (typeof message === "string") return message;
    if (Array.isArray(message)) return message.join(" ");
  }

  return fallback;
}

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllProperties();
      setProperties(data);
      setError("");
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Erro ao carregar propriedades"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(fetchProperties);
  }, [fetchProperties]);

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Tem certeza que deseja deletar "${title}"?`)) {
      try {
        await deleteProperty(id);
        setProperties(properties.filter((p) => p.id !== id));
      } catch (err: unknown) {
        alert(getErrorMessage(err, "Erro ao deletar propriedade"));
      }
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const updated = await updateProperty(id, { status });
      setProperties((current) =>
        current.map((property) => (property.id === id ? { ...property, ...updated } : property)),
      );
    } catch (err: unknown) {
      alert(getErrorMessage(err, "Erro ao atualizar status da propriedade"));
    }
  };

  const filteredProperties = properties.filter((prop) => {
    const matchesSearch =
      prop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "ALL" || prop.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-100 text-green-800";
      case "DRAFT":
        return "bg-gray-100 text-gray-800";
      case "RESERVED":
        return "bg-blue-100 text-blue-800";
      case "SOLD":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <ProtectedAdminRoute>
      <div className="flex bg-gray-50">
        <AdminSidebar />

        <div className="flex-1 lg:ml-64">
          <AdminHeader />

          <main className="p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-black text-gray-900 mb-2">
                Gerenciamento de Imóveis
              </h1>
              <p className="text-gray-500">
                Aprove, edite e gerencie todas as propriedades do sistema
              </p>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700">
                {error}
              </div>
            )}

            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por título ou cidade..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f0442b]"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f0442b]"
                >
                  <option value="ALL">Todos os Status</option>
                  <option value="DRAFT">Rascunho</option>
                  <option value="PUBLISHED">Publicado</option>
                  <option value="RESERVED">Reservado</option>
                  <option value="SOLD">Vendido</option>
                </select>
                <Link
                  href="/admin/properties/create"
                  className="bg-[#f0442b] hover:bg-[#d63220] text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors"
                >
                  <FiPlus /> Novo Imóvel
                </Link>
              </div>

              <div className="text-sm text-gray-600">
                Mostrando {filteredProperties.length} de {properties.length} imóveis
              </div>
            </div>

            {/* Properties Table */}
            {loading ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-lg font-medium">Carregando imóveis...</p>
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-lg text-gray-600 mb-4">
                  {properties.length === 0
                    ? "Nenhum imóvel cadastrado"
                    : "Nenhum imóvel encontrado"}
                </p>
                <Link
                  href="/admin/properties/create"
                  className="inline-block bg-[#f0442b] hover:bg-[#d63220] text-white px-6 py-2 rounded-lg font-bold transition-colors"
                >
                  Criar Primeiro Imóvel
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-6 py-4 font-bold text-gray-600">
                          Título
                        </th>
                        <th className="text-left px-6 py-4 font-bold text-gray-600">
                          Localização
                        </th>
                        <th className="text-left px-6 py-4 font-bold text-gray-600">
                          Preço
                        </th>
                        <th className="text-left px-6 py-4 font-bold text-gray-600">
                          Status
                        </th>
                        <th className="text-left px-6 py-4 font-bold text-gray-600">
                          Fotos
                        </th>
                        <th className="text-center px-6 py-4 font-bold text-gray-600">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProperties.map((property) => (
                        <tr
                          key={property.id}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="px-6 py-4">
                            <div className="font-bold text-gray-900">
                              {property.title}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {property.city}
                          </td>
                          <td className="px-6 py-4 font-bold text-gray-900">
                            {property.price} {property.currency}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusColor(
                                property.status
                              )}`}
                            >
                              {property.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm font-bold text-gray-700">
                              {property.images?.length || 0}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-center gap-2">
                              <Link
                                href={`/admin/properties/${property.id}`}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Editar"
                              >
                                <FiEdit2 size={18} />
                              </Link>
                              {property.status !== "PUBLISHED" ? (
                                <button
                                  onClick={() => handleStatusChange(property.id, "PUBLISHED")}
                                  className="rounded-lg bg-green-50 px-3 py-2 text-xs font-black text-green-700 transition-colors hover:bg-green-100"
                                  title="Publicar"
                                  type="button"
                                >
                                  Publicar
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleStatusChange(property.id, "ARCHIVED")}
                                  className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-black text-amber-700 transition-colors hover:bg-amber-100"
                                  title="Arquivar"
                                  type="button"
                                >
                                  Arquivar
                                </button>
                              )}
                              <button
                                onClick={() =>
                                  handleDelete(property.id, property.title)
                                }
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Deletar"
                              >
                                <FiTrash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </ProtectedAdminRoute>
  );
}
