import { IsBoolean, IsInt, IsOptional, IsString, IsUrl, Max, Min, ValidateIf } from 'class-validator';

export class CreateAmenityDto {
  @IsInt()
  @Min(1)
  id: number;

  @IsOptional()
  @IsString()
  creationTimestamp?: string;

  @IsOptional()
  @IsString()
  updateTimestamp?: string;

  @IsInt()
  clientId: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsBoolean()
  active: boolean;

  @IsString()
  value: string;

  @IsInt()
  @Min(0)
  @Max(100)
  order: number;

  @IsUrl()
  icon: string;

  @IsUrl()
  secondIconUrl: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsBoolean()
  isPromotion: boolean;
}

