import { Module } from '@nestjs/common';
import { BedroomsService } from './bedrooms.service';
import { BedroomsController } from './bedrooms.controller';
import { bedroomsProviders } from './bedrooms.provier';

@Module({
  controllers: [BedroomsController],
  providers: [BedroomsService , ...bedroomsProviders],
})
export class BedroomsModule {}
