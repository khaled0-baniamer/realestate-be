import { Module } from '@nestjs/common';
import { ListingAmenitiesService } from './listing-amenities.service';
import { ListingAmenitiesController } from './listing-amenities.controller';
import { listingAmenityProviders } from './listingAmenity.provider';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register()],
  controllers: [ListingAmenitiesController],
  providers: [ListingAmenitiesService, ...listingAmenityProviders],
})
export class ListingAmenitiesModule {}
