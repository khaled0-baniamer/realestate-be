import { Amenity } from "./entities/amenity.entity";

export const amenityProviders = [
  {
    provide: 'AMENITY_REPOSITORY',
    useValue: Amenity,
  },
];
