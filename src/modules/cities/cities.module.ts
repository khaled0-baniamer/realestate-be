import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { citiesProviders } from './cities.provider';

@Module({
  controllers: [CitiesController],
  providers: [CitiesService, ...citiesProviders],
})
export class CitiesModule {}
