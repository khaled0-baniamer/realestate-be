import { PartialType } from '@nestjs/mapped-types';
import { CreateBacklazeDto } from './create-backlaze.dto';

export class UpdateBacklazeDto extends PartialType(CreateBacklazeDto) {}
