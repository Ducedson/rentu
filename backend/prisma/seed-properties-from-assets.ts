import { PrismaClient, PropertyPurpose, PropertyType, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

const assetsRoot = path.resolve(__dirname, '../../frontend/public/assets');
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);

function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function decodeText(buffer: Buffer) {
  const utf8 = buffer.toString('utf8');
  const decoded = utf8.includes('�')
    ? new TextDecoder('windows-1252').decode(buffer)
    : utf8;

  return decoded.replace(/\r\n/g, '\n').trim();
}

function getTextFile(directory: string) {
  return fs
    .readdirSync(directory)
    .find((file) => file.toLowerCase().endsWith('.txt'));
}

function getImages(directory: string, folderName: string) {
  return fs
    .readdirSync(directory)
    .filter((file) => imageExtensions.has(path.extname(file).toLowerCase()))
    .map((file, index) => ({
      url: `/assets/${encodeURIComponent(folderName)}/${encodeURIComponent(file)}`,
      altText: `${folderName} - Foto ${index + 1}`,
      isCover: index === 0,
      sortOrder: index,
    }));
}

function parsePrice(description: string) {
  const text = description.toLowerCase();
  const priorityPatterns = [
    /pre[cç]o\s*[:-]?\s*(\d+(?:[.,]\d{3})+|\d+)\s*(mil|mzn|mt|mts)?/i,
    /renda\s*[:-]?\s*(\d+(?:[.,]\d{3})+|\d+)\s*(mil|mzn|mt|mts)?/i,
    /valor\s*[:-]?\s*(\d+(?:[.,]\d{3})+|\d+)\s*(mil|mzn|mt|mts)?/i,
    /(\d+(?:[.,]\d{3})+|\d+)\s*(mil|mzn|mt|mts)\b/i,
    /_(\d+(?:[.,]\d{3})+|\d+)\s*(mil|mzn|mt|mts)?/i,
  ];

  for (const pattern of priorityPatterns) {
    const match = text.match(pattern);
    if (!match) continue;

    const value = normalizePrice(match[1], match[2]);
    if (value >= 1000) return value;
  }

  return 10000;
}

function normalizePrice(rawValue: string, suffix?: string) {
  const value = Number(rawValue.replace(/[.,]/g, ''));
  if (!Number.isFinite(value) || value <= 0) return 10000;

  if (suffix?.toLowerCase() === 'mil' && value < 1000) {
    return value * 1000;
  }

  return value;
}

function parseBedrooms(description: string) {
  const text = description.toLowerCase();
  const typeMatch = text.match(/\b(?:tipo|t)[/\s-]*(\d)\b/i);
  const quartosMatch = text.match(/(\d+)\s*quartos?/i);

  if (typeMatch) return Number(typeMatch[1]);
  if (quartosMatch) return Number(quartosMatch[1]);
  return 1;
}

function parseBathrooms(description: string) {
  const text = description.toLowerCase();
  const wcMatches = text.match(/\bwc\b/g);
  const banhoMatches = text.match(/banho/g);
  const total = (wcMatches?.length || 0) + (banhoMatches?.length || 0);

  return Math.max(1, Math.min(total || 1, 4));
}

function inferPurpose(description: string) {
  const text = description.toLowerCase();
  return text.includes('vende') || text.includes('venda')
    ? PropertyPurpose.SALE
    : PropertyPurpose.RENT;
}

function inferType(folderName: string, description: string) {
  const text = `${folderName} ${description}`.toLowerCase();
  if (text.includes('flat')) return PropertyType.APARTMENT;
  if (text.includes('escrit')) return PropertyType.OFFICE;
  return PropertyType.HOUSE;
}

function inferLocation(description: string) {
  const text = description.toLowerCase();

  if (text.includes('matola')) {
    return { city: 'Matola', district: extractDistrict(description) || 'Matola' };
  }

  if (text.includes('maputo') || text.includes('polana') || text.includes('malhangalene')) {
    return { city: 'Maputo', district: extractDistrict(description) || 'Maputo' };
  }

  if (text.includes('marracuene')) {
    return { city: 'Marracuene', district: extractDistrict(description) || 'Marracuene' };
  }

  return { city: 'Maputo', district: extractDistrict(description) || 'Nao informado' };
}

function extractDistrict(description: string) {
  const knownDistricts = [
    'Patrice Damanso Fereira',
    'Malinda Zona Verde',
    'Fomento',
    'Tsalala',
    'Zona Verde',
    'Costa do Sol',
    'Mapulene',
    'Ferroviario',
    'Mateque',
    'Nova Coca Cola',
    'Bairro Central',
    'Malhangalene',
    'Polana Canico',
    'Albazine',
    'Guava',
    'Magoanine',
  ];

  const normalized = description
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  return knownDistricts.find((district) =>
    normalized.includes(
      district
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase(),
    ),
  );
}

function makeTitle(folderName: string, description: string) {
  const bedrooms = parseBedrooms(description);
  const type = inferType(folderName, description);

  if (type === PropertyType.APARTMENT) return `Flat T${bedrooms} - ${folderName}`;
  if (type === PropertyType.OFFICE) return `Escritorio T${bedrooms} - ${folderName}`;
  return `Casa T${bedrooms} - ${folderName}`;
}

async function ensureAdmin() {
  const password = await bcrypt.hash('admin123', 10);

  return prisma.user.upsert({
    where: { email: 'admin@rentu.com' },
    update: {
      name: 'Administrador Rentu',
      password,
      role: UserRole.ADMIN,
      status: 'ACTIVE',
    },
    create: {
      name: 'Administrador Rentu',
      email: 'admin@rentu.com',
      password,
      role: UserRole.ADMIN,
      status: 'ACTIVE',
    },
  });
}

async function main() {
  const admin = await ensureAdmin();
  const folders = fs
    .readdirSync(assetsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory());

  let imported = 0;

  for (const folder of folders) {
    const directory = path.join(assetsRoot, folder.name);
    const textFile = getTextFile(directory);
    const images = getImages(directory, folder.name);

    if (!textFile || images.length === 0) continue;

    const description = decodeText(fs.readFileSync(path.join(directory, textFile)));
    const title = makeTitle(folder.name, description);
    const slug = `asset-${slugify(folder.name)}`;
    const location = inferLocation(description);

    const property = await prisma.property.upsert({
      where: { slug },
      update: {
        title,
        description,
        type: inferType(folder.name, description),
        purpose: inferPurpose(description),
        status: 'PUBLISHED',
        publishedAt: new Date(),
        price: parsePrice(description),
        bedrooms: parseBedrooms(description),
        bathrooms: parseBathrooms(description),
        address: location.district,
        city: location.city,
        district: location.district,
        ownerId: admin.id,
      },
      create: {
        title,
        slug,
        description,
        type: inferType(folder.name, description),
        purpose: inferPurpose(description),
        status: 'PUBLISHED',
        publishedAt: new Date(),
        price: parsePrice(description),
        currency: 'MZN',
        bedrooms: parseBedrooms(description),
        bathrooms: parseBathrooms(description),
        address: location.district,
        city: location.city,
        district: location.district,
        ownerId: admin.id,
      },
    });

    await prisma.propertyImage.deleteMany({ where: { propertyId: property.id } });
    await prisma.propertyImage.createMany({
      data: images.map((image) => ({ ...image, propertyId: property.id })),
    });

    imported += 1;
  }

  console.log(`Imoveis publicados a partir dos assets: ${imported}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
