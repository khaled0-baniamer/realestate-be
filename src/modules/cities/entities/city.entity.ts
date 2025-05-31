import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Country } from 'src/modules/countries/entities/country.entity';

@Table
export class City extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @ForeignKey(() => Country)
  @Column
  countryId: number;

  @BelongsTo(() => Country)
  country: Country;
}
