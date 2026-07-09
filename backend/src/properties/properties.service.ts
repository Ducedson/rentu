import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Prisma,
  PropertyPurpose,
  PropertyType,
  UserRole,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

type CurrentUser = {
  id: string;
  role: UserRole;
};

type PropertyFilters = {
  city?: string;
  type?: PropertyType;
  purpose?: PropertyPurpose;
  q?: string;
};

@Injectable()
export class PropertiesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(filters: PropertyFilters) {
    const where: Prisma.PropertyWhereInput = {
      status: 'PUBLISHED',
      city: filters.city
        ? { contains: filters.city, mode: 'insensitive' }
        : undefined,
      type: filters.type,
      purpose: filters.purpose,
      OR: filters.q
        ? [
            { title: { contains: filters.q, mode: 'insensitive' } },
            { description: { contains: filters.q, mode: 'insensitive' } },
            { city: { contains: filters.q, mode: 'insensitive' } },
            { district: { contains: filters.q, mode: 'insensitive' } },
          ]
        : undefined,
    };

    return this.prisma.property.findMany({
      where,
      include: this.propertyInclude(),
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    });
  }

  findAllForAdmin() {
    return this.prisma.property.findMany({
      include: this.propertyInclude(),
      orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
    });
  }

  findMine(user: CurrentUser) {
    return this.prisma.property.findMany({
      where: { ownerId: user.id },
      include: this.propertyInclude(),
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const property = await this.prisma.property.findUnique({
      where: { id },
      include: {
        ...this.propertyInclude(),
        videos: { orderBy: { sortOrder: 'asc' } },
        documents: true,
        amenities: { include: { amenity: true } },
        agency: true,
        reviews: {
          include: {
            user: { select: { id: true, name: true, avatarUrl: true } },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    await this.prisma.propertyView.create({
      data: { propertyId: id },
    });

    return property;
  }

  create(user: CurrentUser, dto: CreatePropertyDto) {
    const status =
      user.role === 'ADMIN' ? (dto.status ?? 'PUBLISHED') : 'DRAFT';

    return this.prisma.property.create({
      data: {
        ...dto,
        status,
        publishedAt: status === 'PUBLISHED' ? new Date() : undefined,
        price: new Prisma.Decimal(dto.price),
        area: this.toDecimal(dto.area),
        lotArea: this.toDecimal(dto.lotArea),
        latitude: this.toDecimal(dto.latitude),
        longitude: this.toDecimal(dto.longitude),
        availableFrom: dto.availableFrom
          ? new Date(dto.availableFrom)
          : undefined,
        ownerId: user.id,
      },
    });
  }

  async update(id: string, user: CurrentUser, dto: UpdatePropertyDto) {
    const property = await this.ensurePropertyAccess(id, user);
    const nextStatus = dto.status ?? property.status;

    const updated = await this.prisma.property.update({
      where: { id },
      data: {
        ...dto,
        publishedAt:
          property.status !== 'PUBLISHED' && nextStatus === 'PUBLISHED'
            ? new Date()
            : undefined,
        price: this.toDecimal(dto.price),
        area: this.toDecimal(dto.area),
        lotArea: this.toDecimal(dto.lotArea),
        latitude: this.toDecimal(dto.latitude),
        longitude: this.toDecimal(dto.longitude),
        availableFrom: dto.availableFrom
          ? new Date(dto.availableFrom)
          : undefined,
      },
      include: this.propertyInclude(),
    });

    if (
      dto.price !== undefined &&
      property.price.toString() !== dto.price.toString()
    ) {
      await this.prisma.priceHistory.create({
        data: {
          oldPrice: property.price,
          newPrice: new Prisma.Decimal(dto.price),
          propertyId: id,
        },
      });
    }

    if (property.status !== 'PUBLISHED' && updated.status === 'PUBLISHED') {
      await this.notifyOwner(
        updated.ownerId,
        'Im�vel aprovado',
        `${updated.title} foi aprovado e j� est� vis�vel no CgWebsite.`,
      );
    }

    return updated;
  }

  async approve(id: string, user: CurrentUser) {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can approve properties');
    }

    const property = await this.prisma.property.update({
      where: { id },
      data: { status: 'PUBLISHED', publishedAt: new Date() },
      include: this.propertyInclude(),
    });

    await this.notifyOwner(
      property.ownerId,
      'Im�vel aprovado',
      `${property.title} foi aprovado e j� est� vis�vel no CgWebsite.`,
    );
    return property;
  }

  async reject(id: string, user: CurrentUser) {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can reject properties');
    }

    const property = await this.prisma.property.update({
      where: { id },
      data: { status: 'ARCHIVED' },
      include: this.propertyInclude(),
    });

    await this.notifyOwner(
      property.ownerId,
      'Im�vel rejeitado',
      `${property.title} foi rejeitado pelo administrador. Reveja os dados e submeta novamente.`,
    );
    return property;
  }

  async remove(id: string, user: CurrentUser) {
    await this.ensurePropertyAccess(id, user);

    return this.prisma.property.update({
      where: { id },
      data: { status: 'ARCHIVED' },
    });
  }

  private async ensurePropertyAccess(id: string, user: CurrentUser) {
    const property = await this.prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    if (user.role !== 'ADMIN' && property.ownerId !== user.id) {
      throw new ForbiddenException('You cannot manage this property');
    }

    return property;
  }

  async addImage(
    propertyId: string,
    user: CurrentUser,
    data: {
      url: string;
      altText?: string;
      isCover?: boolean;
      sortOrder?: number;
    },
  ) {
    await this.ensurePropertyAccess(propertyId, user);

    return this.prisma.$transaction(async (tx) => {
      if (data.isCover) {
        await tx.propertyImage.updateMany({
          where: { propertyId },
          data: { isCover: false },
        });
      }

      return tx.propertyImage.create({
        data: {
          propertyId,
          url: data.url,
          altText: data.altText,
          isCover: data.isCover || false,
          sortOrder: data.sortOrder || 0,
        },
      });
    });
  }

  async updateImage(
    propertyId: string,
    imageId: string,
    user: CurrentUser,
    data: {
      url?: string;
      altText?: string;
      isCover?: boolean;
      sortOrder?: number;
    },
  ) {
    await this.ensurePropertyAccess(propertyId, user);

    const image = await this.prisma.propertyImage.findUnique({
      where: { id: imageId },
    });

    if (!image || image.propertyId !== propertyId) {
      throw new NotFoundException('Image not found');
    }

    return this.prisma.$transaction(async (tx) => {
      if (data.isCover) {
        await tx.propertyImage.updateMany({
          where: { propertyId, id: { not: imageId } },
          data: { isCover: false },
        });
      }

      return tx.propertyImage.update({
        where: { id: imageId },
        data,
      });
    });
  }

  async deleteImage(propertyId: string, imageId: string, user: CurrentUser) {
    await this.ensurePropertyAccess(propertyId, user);

    const image = await this.prisma.propertyImage.findUnique({
      where: { id: imageId },
    });

    if (!image || image.propertyId !== propertyId) {
      throw new NotFoundException('Image not found');
    }

    return this.prisma.propertyImage.delete({
      where: { id: imageId },
    });
  }

  async getPropertyImages(propertyId: string) {
    return this.prisma.propertyImage.findMany({
      where: { propertyId },
      orderBy: { sortOrder: 'asc' },
    });
  }

  private propertyInclude() {
    return {
      images: { orderBy: { sortOrder: 'asc' as const } },
      owner: { select: { id: true, name: true, phone: true, email: true } },
      agent: {
        include: { user: { select: { id: true, name: true, phone: true } } },
      },
    };
  }

  private async notifyOwner(userId: string, title: string, message: string) {
    await this.prisma.notification.create({
      data: { userId, title, message },
    });
  }

  private toDecimal(value?: number) {
    return value === undefined ? undefined : new Prisma.Decimal(value);
  }
}

