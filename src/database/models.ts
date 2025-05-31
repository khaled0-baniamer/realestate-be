import { Bathroom } from 'src/modules/bathrooms/entities/bathroom.entity';
import { Bedroom } from 'src/modules/bedrooms/entities/bedroom.entity';
import { City } from 'src/modules/cities/entities/city.entity';
import { Country } from 'src/modules/countries/entities/country.entity';
import { District } from 'src/modules/districts/entities/district.entity';
import { Furnished } from 'src/modules/furnished/entities/furnished.entity';
import { Type } from 'src/modules/types/entities/type.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Property } from 'src/modules/properties/entities/property.entity';
import { Amenity } from 'src/modules/amenity/entities/amenity.entity';
import { ListingAmenity } from 'src/modules/listing-amenities/entities/listing-amenity.entity';
import { Appointment } from 'src/modules/appointments/entities/appointment.entity';

export const DBModels = [
  Bathroom,
  Bedroom,
  City,
  Country,
  District,
  Furnished,
  Type,
  User,
  Property,
  Amenity,
  ListingAmenity,
  Appointment,
];
