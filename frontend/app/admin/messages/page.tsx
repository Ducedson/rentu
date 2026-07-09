"use client";

import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import { ProtectedAdminRoute } from "@/components/protected-route";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import { useState } from "react";

export default function MessagesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const messages = [
    {
      id: "1",
      from: "João Silva",
      email: "joao@example.com",
      subject: "Informações sobre a propriedade",
      message: "Gostaria de mais detalhes sobre a casa em Maputo...",
      date: "07/07/2026 14:30",
      read: false,
    },
    {
      id: "2",
      from: "Maria João",
      email: "maria@example.com",
      subject: "Agendamento de visita",
      message: "Gostaria de agendar uma visita para terça-feira...",
      date: "06/07/2026 10:15",
      read: true,
    },
    {
      id: "3",
      from: "Carlos Mendes",
      email: "carlos@example.com",
      subject: "Problema com cadastro",
      message: "Estou tendo dificuldades para enviar fotos...",
      date: "05/07/2026 16:45",
      read: false,
    },
  ];

  const filteredMessages = messages.filter(
    (msg) =>
      msg.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                Mensagens
              </h1>
              <p className="text-gray-500">
                Gerencie mensagens de usuários
              </p>
            </div>

            {/* Search */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="relative">
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por remetente ou assunto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f0442b]"
                />
              </div>
            </div>

            {/* Messages List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {filteredMessages.length === 0 ? (
                <div className="p-8 text-center text-gray-600">
                  Nenhuma mensagem encontrada
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer border-l-4 ${
                        msg.read ? "border-gray-200" : "border-[#f0442b]"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-gray-900">
                            {msg.from}
                          </h3>
                          <p className="text-sm text-gray-500">{msg.email}</p>
                        </div>
                        <span className="text-xs text-gray-500">
                          {msg.date}
                        </span>
                      </div>
                      <p className="font-bold text-gray-900 mb-2">
                        {msg.subject}
                      </p>
                      <p className="text-gray-600 text-sm mb-3">
                        {msg.message}
                      </p>
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-bold">
                          Ver Completo
                        </button>
                        <button className="text-red-600 hover:text-red-800 text-sm font-bold">
                          Deletar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </ProtectedAdminRoute>
  );
}
