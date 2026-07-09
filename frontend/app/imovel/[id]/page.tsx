"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBath, FaBed } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight, FiUser, FiX } from "react-icons/fi";
import { RentuFooter, RentuHeader } from "../../components/rentu-chrome";
import { getProperty, Property } from "@/lib/api";

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

export default function PropertyDetailPage() {
  const params = useParams();
  const propertyId = params.id as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const data = await getProperty(propertyId);
        setProperty(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching property:", err);
        setError("Erro ao carregar imóvel. Por favor, tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchProperty();
    }
  }, [propertyId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-black">
        <RentuHeader />
        <section className="mx-auto max-w-[1380px] px-10 py-8">
          <div className="text-center">
            <p className="text-lg font-medium">Carregando imóvel...</p>
          </div>
        </section>
        <RentuFooter />
      </main>
    );
  }

  if (error || !property) {
    return (
      <main className="min-h-screen bg-white text-black">
        <RentuHeader />
        <section className="mx-auto max-w-[1380px] px-10 py-8">
          <div className="rounded border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-lg font-medium text-red-700">
              {error || "Imóvel não encontrado"}
            </p>
            <Link href="/casas" className="mt-4 inline-block text-blue-600 hover:underline">
              Voltar para imóveis
            </Link>
          </div>
        </section>
        <RentuFooter />
      </main>
    );
  }

  const photos = property.images.length > 0 
    ? property.images.map(img => img.url)
    : ["/assets/a.jpg"]; // fallback image

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-MZ", {
      style: "currency",
      currency: property.currency || "MZN",
    }).format(price);
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <RentuHeader />
      <section className="mx-auto max-w-[1380px] px-10 py-8">
        <button
          className="relative mb-8 h-[520px] w-full overflow-hidden bg-cover bg-center text-left"
          onClick={() => setGalleryOpen(true)}
          style={{ backgroundImage: `url(${photos[0]})` }}
          type="button"
        >
          <span className="absolute right-8 top-8 rounded bg-black/65 px-5 py-3 text-xl font-black text-white">
            {photos.length} Foto{photos.length !== 1 ? "s" : ""}
          </span>
        </button>

        <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
          <section>
            <h1 className="mb-8 text-3xl font-black">
              Preço: {formatPrice(property.price)}
            </h1>
            
            <div className="mb-10 flex gap-10">
              {property.bedrooms && (
                <MetricComponent 
                  icon={<FaBed />} 
                  value={property.bedrooms.toString()} 
                  label="Quartos" 
                />
              )}
              {property.bathrooms && (
                <MetricComponent 
                  icon={<FaBath />} 
                  value={property.bathrooms.toString()} 
                  label="Banheiros" 
                />
              )}
            </div>

            <h2 className="mb-6 text-2xl font-black">Informações do Imóvel</h2>
            <dl className="grid max-w-xl grid-cols-2 gap-y-5 text-lg">
              <dt className="font-black">Tipo</dt>
              <dd className="capitalize">{property.type.toLowerCase()}</dd>
              
              <dt className="font-black">Cidade</dt>
              <dd>{property.city}</dd>
              
              {property.district && (
                <>
                  <dt className="font-black">Bairro</dt>
                  <dd>{property.district}</dd>
                </>
              )}
              
              {property.area && (
                <>
                  <dt className="font-black">Área</dt>
                  <dd>{property.area} m²</dd>
                </>
              )}

              {property.suites && (
                <>
                  <dt className="font-black">Suites</dt>
                  <dd>{property.suites}</dd>
                </>
              )}

              {property.parkingSpaces && (
                <>
                  <dt className="font-black">Lugares de Estacionamento</dt>
                  <dd>{property.parkingSpaces}</dd>
                </>
              )}

              <dt className="font-black">Tipo de Uso</dt>
              <dd className="capitalize">{property.purpose.toLowerCase()}</dd>
            </dl>

            <h2 className="mb-4 mt-10 text-2xl font-black">Descrição</h2>
            <p className="max-w-2xl whitespace-pre-line text-lg font-medium leading-8 text-[#444]">
              {property.description}
            </p>

            {property.address && (
              <>
                <h2 className="mb-4 mt-10 text-2xl font-black">Localização</h2>
                <p className="max-w-2xl text-lg font-medium text-[#444]">
                  {property.address}
                  {property.province && `, ${property.province}`}
                  {property.country && `, ${property.country}`}
                </p>
              </>
            )}
          </section>

          <aside className="h-fit rounded border p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-full bg-[#f4f4f4]">
                <FiUser className="text-2xl" />
              </span>
              <div>
                <p className="text-xl font-black">{property.owner.name}</p>
                <p className="font-bold text-[#777]">Proprietário</p>
              </div>
            </div>
            {property.owner.phone && (
              <>
                <a
                  className="mb-4 grid h-12 place-items-center rounded bg-[#f0442b] text-lg font-black text-white"
                  href={`tel:${property.owner.phone}`}
                >
                  Contactar
                </a>
                <a
                  className="grid h-12 place-items-center rounded border border-[#f0442b] text-lg font-black text-[#f0442b]"
                  href={`https://wa.me/${property.owner.phone.replace(/\D/g, "")}`}
                >
                  Whatsapp
                </a>
              </>
            )}
          </aside>
        </div>
      </section>
      <RentuFooter />

      {galleryOpen ? (
        <div className="fixed inset-0 z-50 bg-black text-white">
          <button
            className="absolute right-10 top-8 flex items-center gap-2 text-xl font-black"
            onClick={() => setGalleryOpen(false)}
            type="button"
          >
            <FiX /> Fechar
          </button>
          <p className="absolute left-10 top-8 text-2xl font-black">
            {photoIndex + 1}/{photos.length}
          </p>
          <button
            className="absolute left-8 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/20 hover:bg-white/30"
            onClick={() => setPhotoIndex((value) => Math.max(0, value - 1))}
            type="button"
            aria-label="Foto anterior"
          >
            <FiChevronLeft className="text-3xl" />
          </button>
          <div
            className="h-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${photos[photoIndex]})` }}
          />
          <button
            className="absolute right-8 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/20 hover:bg-white/30"
            onClick={() =>
              setPhotoIndex((value) => Math.min(photos.length - 1, value + 1))
            }
            type="button"
            aria-label="Próxima foto"
          >
            <FiChevronRight className="text-3xl" />
          </button>
        </div>
      ) : null}
    </main>
  );
}
