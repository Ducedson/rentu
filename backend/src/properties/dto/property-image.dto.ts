import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreatePropertyImageDto {
  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  altText?: string;

  @IsOptional()
  @IsBoolean()
  isCover?: boolean;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}

export class UpdatePropertyImageDto {
  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  altText?: string;

  @IsOptional()
  @IsBoolean()
  isCover?: boolean;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}
