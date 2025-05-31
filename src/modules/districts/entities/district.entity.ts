import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { City } from 'src/modules/cities/entities/city.entity';

@Table
export class District extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @ForeignKey(() => City)
  @Column
  cityId: number;

  @BelongsTo(() => City) 
  city: City;
}
