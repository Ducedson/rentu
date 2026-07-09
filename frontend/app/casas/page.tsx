"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBath, FaBed } from "react-icons/fa";
import { RentuFooter, RentuHeader } from "../components/rentu-chrome";
import { getProperties, Property } from "@/lib/api";

interface Metric {
  icon: React.ReactNode;
  value: string;
  label: string;
  compact?: boolean;
}

function MetricComponent({ icon, value, label, compact = false }: Metric) {
  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <div>
          <p className="text-sm font-black">{value}</p>
          <p className="text-xs font-medium text-[#999]">{label}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-3xl">{icon}</div>
      <p className="text-sm font-black">{value}</p>
      <p className="text-xs font-medium text-[#999]">{label}</p>
    </div>
  );
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const data = await getProperties();
        setProperties(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Erro ao carregar imóveis. Por favor, tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <main className="min-h-screen bg-white text-black">
      <RentuHeader />
      <section className="mx-auto max-w-[1380px] px-10 py-8">
        <h1 className="mb-8 text-4xl font-black">Imóveis Disponíveis</h1>

        {loading && (
          <div className="text-center py-12">
            <p className="text-lg font-medium">Carregando imóveis...</p>
          </div>
        )}

        {error && (
          <div className="rounded border border-red-200 bg-red-50 p-6 text-center mb-8">
            <p className="text-lg font-medium text-red-700">{error}</p>
          </div>
        )}

        {!loading && properties.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-lg font-medium text-[#777]">
              Nenhum imóvel disponível no momento.
            </p>
          </div>
        )}

        {!loading && properties.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {properties.map((property) => {
              const coverImage = property.images.find(img => img.isCover)?.url || property.images[0]?.url || "/assets/a.jpg";
              const formatPrice = (price: number) => {
                return new Intl.NumberFormat("pt-MZ", {
                  style: "currency",
                  currency: property.currency || "MZN",
                }).format(price);
              };

              return (
                <Link
                  className="block hover:shadow-lg transition-shadow"
                  href={`/imovel/${property.id}`}
                  key={property.id}
                >
                  <div
                    className="mb-3 h-40 bg-cover bg-center rounded"
                    style={{ backgroundImage: `url(${coverImage})` }}
                  />
                  <div className="mb-3 flex gap-5">
                    {property.bedrooms && (
                      <MetricComponent
                        compact
                        icon={<FaBed />}
                        value={property.bedrooms.toString()}
                        label="Quartos"
                      />
                    )}
                    {property.bathrooms && (
                      <MetricComponent
                        compact
                        icon={<FaBath />}
                        value={property.bathrooms.toString()}
                        label="Banheiros"
                      />
                    )}
                  </div>
                  <p className="text-lg font-black mb-2">{formatPrice(property.price)}</p>
                  <p className="text-sm text-[#777] line-clamp-2">{property.city}</p>
                </Link>
              );
            })}
          </div>
        )}
      </section>
      <RentuFooter />
    </main>
  );
}
