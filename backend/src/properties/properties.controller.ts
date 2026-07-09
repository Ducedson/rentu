import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PropertyPurpose, PropertyType, UserRole } from '@prisma/client';
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
