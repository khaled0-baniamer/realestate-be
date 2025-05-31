import {
  Controller,
  Post,
  UploadedFile,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BacklazeService } from './backlaze.service';

@Controller('files')
export class FilesController {
  constructor(private readonly backblazeService: BacklazeService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const result = await this.backblazeService.uploadFile(file);
    console.log('🚀 ~ FilesController ~ uploadFile ~ result:', result);
    return { url: this.backblazeService.getFile(result.fileName) };
  }

  @Get(':fileName')
  async getFile(@Param('fileName') fileName: string) {
    console.log('🚀 ~ FilesController ~ getFile ~ fileName:', fileName);
    const url = await this.backblazeService.getFile(fileName);
    return { url };
  }
}
