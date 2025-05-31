import { PartialType } from '@nestjs/mapped-types';
import { CreateListingAmenityDto } from './create-listing-amenity.dto';

export class UpdateListingAmenityDto extends PartialType(CreateListingAmenityDto) {}
