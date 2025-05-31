import { Module } from '@nestjs/common';
import { DistrictsService } from './districts.service';
import { DistrictsController } from './districts.controller';
import { districtsProviders } from './districts.provider';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports:[CacheModule.register()],
  controllers: [DistrictsController],
  providers: [DistrictsService , ...districtsProviders],
})
export class DistrictsModule {}
