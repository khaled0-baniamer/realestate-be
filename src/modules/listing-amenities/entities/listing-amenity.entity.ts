import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Amenity } from 'src/modules/amenity/entities/amenity.entity';
import { Property } from 'src/modules/properties/entities/property.entity';

@Table
export class ListingAmenity extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Property)
  @Column
  listingId: number;

  @ForeignKey(() => Amenity)
  @Column
  amenityId: number;

  @BelongsTo(() => Property)
  listing: Property;

  @BelongsTo(() => Amenity)
  amenity: Amenity;
}
