import { Module } from '@nestjs/common';
import { TypesService } from './types.service';
import { TypesController } from './types.controller';
import { typesProviders } from './types.provider';

@Module({
  controllers: [TypesController],
  providers: [TypesService ,...typesProviders],
})
export class TypesModule {}
