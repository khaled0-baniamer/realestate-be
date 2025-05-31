import { Module } from '@nestjs/common';
import { BathroomsService } from './bathrooms.service';
import { BathroomsController } from './bathrooms.controller';
import { bathroomsProviders } from './batrooms.provider';

@Module({
  controllers: [BathroomsController],
  providers: [BathroomsService , ...bathroomsProviders],
})
export class BathroomsModule {}
