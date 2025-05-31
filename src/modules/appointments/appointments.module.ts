import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { appointmentProviders } from './appointment.provider';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, ...appointmentProviders],
})
export class AppointmentsModule {}
