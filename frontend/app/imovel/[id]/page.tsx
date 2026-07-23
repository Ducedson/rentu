"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBath, FaBed } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight, FiUser, FiX } from "react-icons/fi";
import { RentuFooter, RentuHeader } from "../../components/rentu-chrome";
import { getProperty, Property } from "@/lib/api";
import { normalizeImageUrl } from "@/lib/properties-ui";
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
    ? property.images.map((img) => normalizeImageUrl(img.url))
    : ["/assets/a.jpg"]; // fallback image
  const ownerPhone = property.owner.phone?.replace(/\D/g, "");
  const whatsappHref = ownerPhone ? `https://wa.me/${ownerPhone}` : "";

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-MZ", {
      style: "currency",
      currency: property.currency || "MZN",
    }).format(price);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-black">
      <RentuHeader />
      <section className="mx-auto max-w-[1380px] px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
        <button
          className="relative mb-8 h-72 w-full overflow-hidden bg-cover bg-center text-left sm:h-[420px] lg:h-[520px]"
          onClick={() => setGalleryOpen(true)}
          style={{ backgroundImage: `url(${photos[0]})` }}
          type="button"
        >
          <span className="absolute right-4 top-4 rounded bg-black/65 px-4 py-2 text-base font-black text-white sm:right-8 sm:top-8 sm:px-5 sm:py-3 sm:text-xl">
            {photos.length} Foto{photos.length !== 1 ? "s" : ""}
          </span>
        </button>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
          <section>
            <h1 className="mb-8 text-3xl font-black">
              Preço: {formatPrice(property.price)}
            </h1>
            
            <div className="mb-10 flex flex-wrap gap-8 sm:gap-10">
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
            <dl className="grid max-w-xl grid-cols-1 gap-y-3 text-base sm:grid-cols-2 sm:gap-y-5 sm:text-lg">
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

          <aside className="h-fit rounded border p-5 shadow-sm sm:p-6">
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
            className="absolute right-4 top-5 flex items-center gap-2 text-base font-black sm:right-10 sm:top-8 sm:text-xl"
            onClick={() => setGalleryOpen(false)}
            type="button"
          >
            <FiX /> Fechar
          </button>
          <p className="absolute left-4 top-5 text-xl font-black sm:left-10 sm:top-8 sm:text-2xl">
            {photoIndex + 1}/{photos.length}
          </p>
          <div className="absolute bottom-5 left-4 right-4 z-10 rounded bg-white p-4 text-black shadow-2xl sm:bottom-8 sm:left-10 sm:right-auto sm:w-[360px] sm:p-5">
            <p className="text-sm font-black uppercase tracking-wide text-[#f0442b]">
              Administrador Rentu
            </p>
            <div className="mt-3 flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#f4f4f4]">
                <FiUser className="text-xl" />
              </span>
              <div>
                <p className="text-lg font-black">{property.owner.name}</p>
                <p className="font-bold text-[#777]">Proprietario</p>
              </div>
            </div>
            {whatsappHref ? (
              <a
                className="mt-4 grid h-11 place-items-center rounded bg-[#25d366] font-black text-white"
                href={whatsappHref}
                rel="noreferrer"
                target="_blank"
              >
                Falar no WhatsApp
              </a>
            ) : null}
          </div>
          <button
            className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/20 hover:bg-white/30 sm:left-8 sm:size-12"
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
            className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/20 hover:bg-white/30 sm:right-8 sm:size-12"
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
