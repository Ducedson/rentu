"use client";

import { FiBell, FiSettings } from "react-icons/fi";

export function AdminHeader() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="ml-64 px-8 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900">
            Painel de Administração
          </h1>
          <p className="text-sm text-gray-500">Rentu</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <FiBell size={24} />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>

          {/* Settings */}
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <FiSettings size={24} />
          </button>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <div className="font-bold text-sm text-gray-900">Administrador</div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
            <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
              A
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
