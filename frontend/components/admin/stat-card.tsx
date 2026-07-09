"use client";

import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  number: string | number;
  title: string;
  subtitle: string;
  color: "blue" | "green" | "orange" | "red";
}

const colorMap = {
  blue: {
    bg: "bg-blue-100",
    icon: "text-blue-500",
    border: "border-blue-200",
  },
  green: {
    bg: "bg-green-100",
    icon: "text-green-500",
    border: "border-green-200",
  },
  orange: {
    bg: "bg-orange-100",
    icon: "text-orange-500",
    border: "border-orange-200",
  },
  red: {
    bg: "bg-red-100",
    icon: "text-red-500",
    border: "border-red-200",
  },
};

export function StatCard({
  icon,
  number,
  title,
  subtitle,
  color,
}: StatCardProps) {
  const colors = colorMap[color];

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`${colors.bg} ${colors.icon} p-3 rounded-lg text-2xl`}>
          {icon}
        </div>
      </div>
      <div className="text-3xl font-black text-gray-900 mb-2">{number}</div>
      <div className="text-sm font-bold text-gray-900 mb-1">{title}</div>
      <div className="text-xs text-gray-500">{subtitle}</div>
    </div>
  );
}
