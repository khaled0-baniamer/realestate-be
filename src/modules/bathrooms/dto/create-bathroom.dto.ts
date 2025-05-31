import { IsString } from 'class-validator';

export class CreateBathroomDto {
  @IsString()
  name: string;
}
