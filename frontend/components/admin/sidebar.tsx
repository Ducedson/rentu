"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  FiHome,
  FiUsers,
  FiFileText,
  FiLogOut,
  FiMenu,
  FiX,
  FiBarChart,
  FiMessageSquare,
  FiMapPin,
} from "react-icons/fi";
import { useState } from "react";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: FiHome,
      section: "DASHBOARD",
    },
    {
      label: "Imóveis",
      href: "/admin/properties",
      icon: FiMapPin,
      section: "GERENCIAMENTO",
    },
    {
      label: "Usuários",
      href: "/admin/users",
      icon: FiUsers,
      section: "GERENCIAMENTO",
    },
    {
      label: "Estatísticas",
      href: "/admin/stats",
      icon: FiBarChart,
      section: "RELATÓRIOS",
    },
    {
      label: "Mensagens",
      href: "/admin/messages",
      icon: FiMessageSquare,
      section: "GERENCIAMENTO",
    },
    {
      label: "Documentos",
      href: "/admin/documents",
      icon: FiFileText,
      section: "GERENCIAMENTO",
    },
  ];

  const sections = Array.from(new Set(navItems.map((item) => item.section)));

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-[#f0442b] text-white p-2 rounded-lg"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gray-100 border-r border-gray-200 transition-transform lg:translate-x-0 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="bg-[#f0442b] text-white px-3 py-1 rounded font-black text-xl">
              R
            </div>
            <div>
              <div className="font-black text-lg">Rentu Admin</div>
              <div className="text-xs text-gray-500">Painel de Gestão</div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          {sections.map((section) => (
            <div key={section} className="mb-6">
              <div className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2 px-2">
                {section}
              </div>
              <ul className="space-y-2">
                {navItems
                  .filter((item) => item.section === section)
                  .map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link href={item.href}>
                          <div
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                              isActive
                                ? "bg-[#f0442b] text-white font-bold"
                                : "text-gray-700 hover:bg-white"
                            }`}
                          >
                            <Icon size={20} />
                            <span>{item.label}</span>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div className="border-t border-gray-200 p-4">
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm truncate">{user?.name}</div>
                <div className="text-xs text-gray-500 truncate">{user?.role}</div>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg font-bold transition-colors text-sm"
          >
            <FiLogOut />
            Sair
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
