import { Module } from '@nestjs/common';
import { BacklazeService } from './backlaze.service';
import { FilesController} from './backlaze.controller';

@Module({
  controllers: [FilesController],
  providers: [BacklazeService],
})
export class BacklazeModule {}
