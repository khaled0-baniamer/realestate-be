import { Module } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { propertiesProviders } from './properties.provider';

@Module({
  controllers: [PropertiesController],
  providers: [PropertiesService ,...propertiesProviders],
})
export class PropertiesModule {}
