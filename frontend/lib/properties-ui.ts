import { Property } from "./api";

export const PROPERTY_TYPE_LABELS: Record<string, string> = {
  HOUSE: "Casas",
  APARTMENT: "Flats",
  OFFICE: "Escritórios",
  STORE: "Lojas",
  WAREHOUSE: "Armazéns",
  LAND: "Terrenos",
  FARM: "Quintas",
  OTHER: "Outros",
};

export const PROPERTY_TYPE_OPTIONS = [
  { value: "HOUSE", label: "Casas" },
  { value: "APARTMENT", label: "Flats" },
  { value: "OFFICE", label: "Escritórios" },
  { value: "STORE", label: "Lojas" },
  { value: "WAREHOUSE", label: "Armazéns" },
  { value: "LAND", label: "Terrenos" },
  { value: "OTHER", label: "Outros" },
];

export const STATUS_LABELS: Record<string, string> = {
  DRAFT: "Em aprovação",
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
  if (!url) return "/assets/a.jpg";

  if (url.startsWith("http")) {
    return url;
  }

  return `https://api.rentu.co.mz${url}`;
}
 
export function getPropertyCover(property: Property) {
  return (
    normalizeImageUrl(
      property.images.find((image) => image.isCover)?.url
    ) ||
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

export function sanitizePublicDescription(description: string) {
  return description
    .replace(/[\p{Extended_Pictographic}\uFE0F]/gu, "")
    .split("\n")
    .filter((line) => !/^\s*[-•]?\s*conta(?:c|t)o\s*:/i.test(line))
    .map((line) => line.replace(/[ \t]{2,}/g, " ").trimEnd())
    .join("\n")
    .trim();
}

export function getDashboardPath(role?: string) {
  if (role === "ADMIN") return "/admin";
  if (role === "AGENT" || role === "OWNER") return "/intermediario";
  return "/cliente";
}
