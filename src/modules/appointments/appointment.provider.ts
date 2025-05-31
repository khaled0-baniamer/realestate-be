import { Appointment } from './entities/appointment.entity';

export const appointmentProviders = [
  {
    provide: 'APPOINTMENT_REPOSITORY',
    useValue: Appointment,
  },
];
