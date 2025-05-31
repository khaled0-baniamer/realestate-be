import { Module } from '@nestjs/common';
import { AmenityService } from './amenity.service';
import { AmenityController } from './amenity.controller';
import { amenityProviders } from './amenity.provider';

@Module({
  controllers: [AmenityController],
  providers: [AmenityService , ...amenityProviders],
})
export class AmenityModule {}
