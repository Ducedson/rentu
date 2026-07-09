"use client";

import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import { ProtectedAdminRoute } from "@/components/protected-route";
import { FiBarChart, FiTrendingUp, FiUsers, FiMapPin } from "react-icons/fi";
import { StatCard } from "@/components/admin/stat-card";

export default function StatsPage() {
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
                Estatísticas e Relatórios
              </h1>
              <p className="text-gray-500">
                Visualize dados e tendências do seu sistema
              </p>
            </div>

            {/* KPIs */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <StatCard
                icon={<FiUsers />}
                number="1.245"
                title="Total de Visitas"
                subtitle="Este mês"
                color="blue"
              />
              <StatCard
                icon={<FiTrendingUp />}
                number="23%"
                title="Crescimento"
                subtitle="Comparado ao mês anterior"
                color="green"
              />
              <StatCard
                icon={<FiMapPin />}
                number="89"
                title="Novas Propriedades"
                subtitle="Este mês"
                color="orange"
              />
              <StatCard
                icon={<FiBarChart />}
                number="234"
                title="Agendamentos"
                subtitle="Em processamento"
                color="red"
              />
            </div>

            {/* Charts Placeholder */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-black text-gray-900 mb-4">
                  Imóveis por Mês
                </h2>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <p className="text-gray-500">
                    Gráfico será implementado aqui
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-black text-gray-900 mb-4">
                  Usuários Ativos
                </h2>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <p className="text-gray-500">
                    Gráfico será implementado aqui
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedAdminRoute>
  );
}
