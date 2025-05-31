import { Inject, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { User } from '../users/entities/user.entity';
import { Property } from '../properties/entities/property.entity';
import { City } from '../cities/entities/city.entity';
import { Country } from '../countries/entities/country.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @Inject('APPOINTMENT_REPOSITORY')
    private readonly appointmentModel: typeof Appointment,
  ) {}

  async create(user: User, createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentModel.create(
      {
        ...createAppointmentDto,
        userId: user.id,
      },
      { include: { all: true } },
    );
  }

  findAll() {
    return this.appointmentModel.findAll({
      include: [
        { model: User, attributes: { exclude: ['password'] } },
        {
          model: Property,
          attributes: ['id', 'title'],
          include: [
            {
              model: City,
              attributes: ['id', 'name'],
            },
            {
              model: Country,
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    });
  }

  findOne(id: number) {
    return this.appointmentModel.findByPk(id, {
      include: [
        { model: User, attributes: { exclude: ['password'] } },
        {
          model: Property,
          attributes: ['id', 'title'],
          include: [
            {
              model: City,
              attributes: ['id', 'name'],
            },
            {
              model: Country,
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    });
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
