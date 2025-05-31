import { IsNumber, IsString } from 'class-validator';

export class CreateCityDto {
  @IsString()
  name: string;

  @IsNumber()
  countryId: number;
}
