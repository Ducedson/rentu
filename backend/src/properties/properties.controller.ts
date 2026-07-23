import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PropertyPurpose, PropertyType, UserRole } from '@prisma/client';
import { mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles, RolesGuard } from '../common/guards/roles.guard';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import {
  CreatePropertyImageDto,
  UpdatePropertyImageDto,
} from './dto/property-image.dto';
import { PropertiesService } from './properties.service';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get()
  findAll(
    @Query('city') city?: string,
    @Query('type') type?: PropertyType,
    @Query('purpose') purpose?: PropertyPurpose,
    @Query('q') q?: string,
  ) {
    return this.propertiesService.findAll({ city, type, purpose, q });
  }

  @Get('admin/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  findAllForAdmin() {
    return this.propertiesService.findAllForAdmin();
  }

  @Get('me/list')
  @UseGuards(JwtAuthGuard)
  findMine(@CurrentUser() user: { id: string; role: UserRole }) {
    return this.propertiesService.findMine(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @CurrentUser() user: { id: string; role: UserRole },
    @Body() dto: CreatePropertyDto,
  ) {
    return this.propertiesService.create(user, dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @CurrentUser() user: { id: string; role: UserRole },
    @Body() dto: UpdatePropertyDto,
  ) {
    return this.propertiesService.update(id, user, dto);
  }

  @Patch(':id/approve')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  approve(
    @Param('id') id: string,
    @CurrentUser() user: { id: string; role: UserRole },
  ) {
    return this.propertiesService.approve(id, user);
  }

  @Patch(':id/reject')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  reject(
    @Param('id') id: string,
    @CurrentUser() user: { id: string; role: UserRole },
  ) {
    return this.propertiesService.reject(id, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(
    @Param('id') id: string,
    @CurrentUser() user: { id: string; role: UserRole },
  ) {
    return this.propertiesService.remove(id, user);
  }

  @Get(':id/images')
  getPropertyImages(@Param('id') id: string) {
    return this.propertiesService.getPropertyImages(id);
  }

  @Post(':id/images')
  @UseGuards(JwtAuthGuard)
  addImage(
    @Param('id') id: string,
    @CurrentUser() user: { id: string; role: UserRole },
    @Body() dto: CreatePropertyImageDto,
  ) {
    return this.propertiesService.addImage(id, user, dto);
  }

  @Post(':id/images/upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (_req, _file, callback) => {
          const uploadPath = join(process.cwd(), 'public', 'uploads');
          mkdirSync(uploadPath, { recursive: true });
          callback(null, uploadPath);
        },
        filename: (_req, file, callback) => {
          const extension = extname(file.originalname) || '.jpg';
          const filename = `${Date.now()}-${Math.round(
            Math.random() * 1e9,
          )}${extension}`;
          callback(null, filename);
        },
      }),
      fileFilter: (_req, file, callback) => {
        callback(null, file.mimetype.startsWith('image/'));
      },
      limits: { fileSize: 8 * 1024 * 1024 },
    }),
  )
  uploadImage(
    @Param('id') id: string,
    @CurrentUser() user: { id: string; role: UserRole },
    @UploadedFile() file,
  ) {
    if (!file) {
      throw new BadRequestException('Envie uma imagem valida.');
    }

    return this.propertiesService.addImage(id, user, {
      url: `/uploads/${file.filename}`,
      altText: file.originalname,
      isCover: true,
      sortOrder: 0,
    });
  }

  @Patch(':id/images/:imageId')
  @UseGuards(JwtAuthGuard)
  updateImage(
    @Param('id') id: string,
    @Param('imageId') imageId: string,
    @CurrentUser() user: { id: string; role: UserRole },
    @Body() dto: UpdatePropertyImageDto,
  ) {
    return this.propertiesService.updateImage(id, imageId, user, dto);
  }

  @Delete(':id/images/:imageId')
  @UseGuards(JwtAuthGuard)
  deleteImage(
    @Param('id') id: string,
    @Param('imageId') imageId: string,
    @CurrentUser() user: { id: string; role: UserRole },
  ) {
    return this.propertiesService.deleteImage(id, imageId, user);
  }
}
