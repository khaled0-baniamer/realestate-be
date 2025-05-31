import { ListingAmenity } from "./entities/listing-amenity.entity";

export const listingAmenityProviders = [
  {
    provide: 'LISTING_AMENITIES_REPOSITORY',
    useValue: ListingAmenity,
  },
];
