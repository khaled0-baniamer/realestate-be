import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Bathroom } from 'src/modules/bathrooms/entities/bathroom.entity';
import { Bedroom } from 'src/modules/bedrooms/entities/bedroom.entity';
import { City } from 'src/modules/cities/entities/city.entity';
import { Country } from 'src/modules/countries/entities/country.entity';
import { District } from 'src/modules/districts/entities/district.entity';
import { Furnished } from 'src/modules/furnished/entities/furnished.entity';
import { Type } from 'src/modules/types/entities/type.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Table
export class Property extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  title: string;

  @Column({ type: DataType.TEXT })
  description: string;

  @Column
  area: number;

  @Column
  images: string;

  @Column
  price: number;

  @ForeignKey(() => Bedroom)
  @Column
  bedroomId: number;

  @BelongsTo(() => Bedroom)
  bedroom: Bedroom;

  @ForeignKey(() => Bathroom)
  @Column
  bathroomId: number;

  @BelongsTo(() => Bathroom)
  bathroom: Bathroom;

  @ForeignKey(() => Country)
  @Column
  countryId: number;

  @BelongsTo(() => Country)
  country: Country;

  @ForeignKey(() => City)
  @Column
  cityId: number;

  @BelongsTo(() => City)
  city: City;

  @ForeignKey(() => District)
  @Column
  districtId: number;

  @BelongsTo(() => District)
  district: District;

  @ForeignKey(() => Type)
  @Column
  typeId: number;

  @BelongsTo(() => Type)
  type: Type;

  @ForeignKey(() => Furnished)
  @Column
  furnishedId: number;

  @BelongsTo(() => Furnished)
  furnished: Furnished;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Default('rent')
  @Column
  purpose: string;
}
