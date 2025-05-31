import { Controller, Get, Post, Body, Param, Request, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Request as RequestType } from 'express';
import { AuthGuard } from 'src/guards';
import { User } from '../users/entities/user.entity';

type RequestWithUser = RequestType & { user: User };

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Request() request: RequestWithUser,
    @Body() createAppointmentDto: CreateAppointmentDto,
  ) {
    const user = request.user;
    return this.appointmentsService.create(user, createAppointmentDto);
  }

  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }
}
