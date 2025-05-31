import {
  IsArray,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class FilterPropertyDto {
  @IsOptional()
  @IsNumberString()
  areaFrom: number;

  @IsOptional()
  @IsNumberString()
  areaTo: number;

  @IsOptional()
  @IsNumberString()
  priceFrom: number;

  @IsOptional()
  @IsNumberString()
  priceTo: number;

  @IsOptional()
  @IsString()
  purpose: string;

  @IsOptional()
  @IsArray()
  @IsNumberString({}, { each: true })
  bedroomId: number[];

  @IsOptional()
  @IsArray()
  @IsNumberString({}, { each: true })
  bathroomId: number[];

  @IsOptional()
  @IsNumberString()
  countryId: number;

  @IsOptional()
  @IsNumberString()
  cityId: number;

  @IsOptional()
  @IsArray()
  @IsNumberString({}, { each: true })
  districtId: number[];

  @IsOptional()
  @IsArray()
  @IsNumberString({}, { each: true })
  typeId: number[];

  @IsOptional()
  @IsArray()
  @IsNumberString({}, { each: true })
  furnishedId: number[];

  @IsOptional()
  @IsNumberString()
  page: number;

  @IsOptional()
  @IsNumberString()
  size: number;
}
