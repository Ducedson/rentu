import { Property } from "./api";

export const PROPERTY_TYPE_LABELS: Record<string, string> = {
  HOUSE: "Casas",
  APARTMENT: "Flats",
  OFFICE: "Escritorios",
  STORE: "Lojas",
  WAREHOUSE: "Armazens",
  LAND: "Terrenos",
  FARM: "Quintas",
  OTHER: "Outros",
};

export const PROPERTY_TYPE_OPTIONS = [
  { value: "HOUSE", label: "Casas" },
  { value: "APARTMENT", label: "Flats" },
  { value: "OFFICE", label: "Escritorios" },
  { value: "STORE", label: "Lojas" },
  { value: "WAREHOUSE", label: "Armazens" },
  { value: "LAND", label: "Terrenos" },
  { value: "OTHER", label: "Outros" },
];

export const STATUS_LABELS: Record<string, string> = {
  DRAFT: "Em aprovacao",
  PUBLISHED: "Publicado",
  ARCHIVED: "Arquivado",
  RESERVED: "Reservado",
  SOLD: "Vendido",
  RENTED: "Arrendado",
};

export function getPropertyTypeLabel(type: string) {
  return PROPERTY_TYPE_LABELS[type] || type;
}

export function normalizeImageUrl(url?: string) {
  if (!url) return "";

  const normalized = url.replace(/\\/g, "/");
  const assetsIndex = normalized.indexOf("/assets/");

  if (assetsIndex >= 0) {
    return normalized.slice(assetsIndex).split("/").map((part, index) => {
      if (index === 0 || !part) return part;

      try {
        return encodeURIComponent(decodeURIComponent(part));
      } catch {
        return encodeURIComponent(part);
      }
    }).join("/");
  }

  return normalized;
}

export function getPropertyCover(property: Property) {
  return (
    normalizeImageUrl(property.images.find((image) => image.isCover)?.url) ||
    normalizeImageUrl(property.images[0]?.url) ||
    "/assets/a.jpg"
  );
}

export function formatPropertyPrice(property: Pick<Property, "price" | "currency">) {
  return new Intl.NumberFormat("pt-MZ", {
    style: "currency",
    currency: property.currency || "MZN",
    maximumFractionDigits: 0,
  }).format(Number(property.price));
}

export function getDashboardPath(role?: string) {
  if (role === "ADMIN") return "/admin";
  if (role === "AGENT" || role === "OWNER") return "/intermediario";
  return "/cliente";
}
