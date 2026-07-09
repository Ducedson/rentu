"use client";

import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import { ProtectedAdminRoute } from "@/components/protected-route";
import { FiSearch, FiDownload, FiTrash2, FiPlus } from "react-icons/fi";
import { useState } from "react";

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const documents = [
    {
      id: "1",
      name: "Contrato Aluguel - João Silva",
      type: "PDF",
      size: "2.4 MB",
      date: "06/07/2026",
      status: "Assinado",
    },
    {
      id: "2",
      name: "Planta Imóvel Maputo",
      type: "PDF",
      size: "1.8 MB",
      date: "05/07/2026",
      status: "Pendente",
    },
    {
      id: "3",
      name: "Certificado Energia",
      type: "PDF",
      size: "3.2 MB",
      date: "04/07/2026",
      status: "Verificado",
    },
    {
      id: "4",
      name: "Escritura Propriedade",
      type: "PDF",
      size: "4.1 MB",
      date: "03/07/2026",
      status: "Assinado",
    },
  ];

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Assinado":
        return "bg-green-100 text-green-800";
      case "Pendente":
        return "bg-yellow-100 text-yellow-800";
      case "Verificado":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
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
                Documentos
              </h1>
              <p className="text-gray-500">
                Gerencie documentos e arquivos do sistema
              </p>
            </div>

            {/* Search and Action */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar documentos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f0442b]"
                  />
                </div>
                <button className="bg-[#f0442b] hover:bg-[#d63220] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors">
                  <FiPlus /> Enviar Documento
                </button>
              </div>
            </div>

            {/* Documents Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {filteredDocuments.length === 0 ? (
                <div className="p-8 text-center text-gray-600">
                  Nenhum documento encontrado
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-6 py-4 font-bold text-gray-600">
                          Nome
                        </th>
                        <th className="text-left px-6 py-4 font-bold text-gray-600">
                          Tipo
                        </th>
                        <th className="text-left px-6 py-4 font-bold text-gray-600">
                          Tamanho
                        </th>
                        <th className="text-left px-6 py-4 font-bold text-gray-600">
                          Data
                        </th>
                        <th className="text-left px-6 py-4 font-bold text-gray-600">
                          Status
                        </th>
                        <th className="text-center px-6 py-4 font-bold text-gray-600">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDocuments.map((doc) => (
                        <tr
                          key={doc.id}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 font-bold text-gray-900">
                            {doc.name}
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {doc.type}
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {doc.size}
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {doc.date}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusColor(
                                doc.status
                              )}`}
                            >
                              {doc.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-center gap-2">
                              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <FiDownload size={18} />
                              </button>
                              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <FiTrash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </ProtectedAdminRoute>
  );
}
