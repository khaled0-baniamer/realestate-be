import { IsString } from 'class-validator';

export class CreateBedroomDto {
  @IsString()
  name: string;
}
