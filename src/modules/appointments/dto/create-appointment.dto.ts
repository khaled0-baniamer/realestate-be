import { IsDateString, IsMilitaryTime, IsNumber } from 'class-validator';

export class CreateAppointmentDto {
  @IsNumber()
  listingId: number;

  @IsDateString()
  date: string;

  @IsMilitaryTime()
  time: string;
}
