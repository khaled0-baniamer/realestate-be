import { Controller, Get, Param } from '@nestjs/common';
import { ListingAmenitiesService } from './listing-amenities.service';

@Controller('listing-amenities')
export class ListingAmenitiesController {
  constructor(private readonly listingAmenitiesService: ListingAmenitiesService) {}

  @Get(':id')
  findOne(@Param('id') listingId: string) {
    return this.listingAmenitiesService.findListingAmenities(+listingId);
  }

}
