import { IsString } from 'class-validator';

export class CreateFurnishedDto {
  @IsString()
  name: string;
}
