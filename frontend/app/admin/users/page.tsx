"use client";

import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import { ProtectedAdminRoute } from "@/components/protected-route";
import { FiSearch, FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import Link from "next/link";

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const users = [
    {
      id: "1",
      name: "João Silva",
      email: "joao@example.com",
      phone: "+258 21 123 456",
      status: "Ativo",
      role: "Proprietário",
      joined: "01/07/2026",
      properties: 5,
    },
    {
      id: "2",
      name: "Maria João",
      email: "maria@example.com",
      phone: "+258 82 345 678",
      status: "Ativo",
      role: "Cliente",
      joined: "02/07/2026",
      properties: 0,
    },
    {
      id: "3",
      name: "Carlos Mendes",
      email: "carlos@example.com",
      phone: "+258 21 456 789",
      status: "Pendente",
      role: "Proprietário",
      joined: "05/07/2026",
      properties: 2,
    },
    {
      id: "4",
      name: "Ana Santos",
      email: "ana@example.com",
      phone: "+258 82 567 890",
      status: "Ativo",
      role: "Agente",
      joined: "10/06/2026",
      properties: 8,
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo":
        return "bg-green-100 text-green-800";
      case "Pendente":
        return "bg-yellow-100 text-yellow-800";
      case "Suspenso":
        return "bg-red-100 text-red-800";
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
                Gerenciamento de Usuários
              </h1>
              <p className="text-gray-500">
                Gerencie contas, permissões e informações dos usuários
              </p>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por nome ou email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f0442b]"
                  />
                </div>
                <button className="bg-[#f0442b] hover:bg-[#d63220] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors">
                  <FiPlus /> Novo Usuário
                </button>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">
                        Nome
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">
                        Telefone
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">
                        Tipo
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">
                        Imóveis
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-900">
                            {user.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm">
                          {user.phone}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-bold text-gray-700">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusColor(
                              user.status
                            )}`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-bold text-gray-900">
                            {user.properties}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <FiEdit size={18} />
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
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Mostrando {filteredUsers.length} de {users.length} usuários
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-bold">
                  Anterior
                </button>
                <button className="px-4 py-2 bg-[#f0442b] text-white rounded-lg font-bold">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-bold">
                  Próxima
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedAdminRoute>
  );
}
