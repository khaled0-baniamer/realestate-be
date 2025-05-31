import { Module } from '@nestjs/common';
import { FurnishedService } from './furnished.service';
import { FurnishedController } from './furnished.controller';
import { furnishedProviders } from './furnished.provider';

@Module({
  controllers: [FurnishedController],
  providers: [FurnishedService , ...furnishedProviders],
})
export class FurnishedModule {}
