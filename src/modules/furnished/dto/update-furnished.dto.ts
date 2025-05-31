import { PartialType } from '@nestjs/mapped-types';
import { CreateFurnishedDto } from './create-furnished.dto';

export class UpdateFurnishedDto extends PartialType(CreateFurnishedDto) {}
