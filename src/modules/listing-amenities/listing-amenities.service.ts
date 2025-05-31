import { Inject, Injectable } from '@nestjs/common';
import { ListingAmenity } from './entities/listing-amenity.entity';
import { Amenity } from '../amenity/entities/amenity.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ListingAmenitiesService {
  constructor(
    @Inject('LISTING_AMENITIES_REPOSITORY')
    private readonly lisitngAmenitiesModel: typeof ListingAmenity,
    @Inject(CACHE_MANAGER) private cacheManger: Cache,
  ) {}

  async findListingAmenities(listingId: number) {
    const cachedKey = `listing-amenities-${listingId}`;
    const cachedListingsAmenities = await this.cacheManger.get(cachedKey);

    if (cachedListingsAmenities) {
      return cachedListingsAmenities;
    }

    const listingAmenities = await this.lisitngAmenitiesModel.findAll({
      where: { listingId },
      include: { model: Amenity },
    });

    await this.cacheManger.set(cachedKey, listingAmenities);

    return listingAmenities;
  }
}
