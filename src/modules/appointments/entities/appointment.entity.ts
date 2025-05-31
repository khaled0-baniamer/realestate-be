import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Property } from 'src/modules/properties/entities/property.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Table
export class Appointment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Property)
  @Column
  listingId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => Property)
  listing: Property;

  @BelongsTo(() => User)
  user: User;

  @Column({ type: DataType.DATEONLY })
  date: string;

  @Column({ type: DataType.TIME })
  time: string;
}
