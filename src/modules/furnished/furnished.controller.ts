import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FurnishedService } from './furnished.service';
import { CreateFurnishedDto } from './dto/create-furnished.dto';
import { UpdateFurnishedDto } from './dto/update-furnished.dto';
import { Furnished } from './entities/furnished.entity';

@Controller('furnisheds')
export class FurnishedController {
  constructor(private readonly furnishedService: FurnishedService) {}

  @Post()
  async create(@Body() createFurnishedDto: CreateFurnishedDto): Promise<Furnished> {
    return this.furnishedService.create(createFurnishedDto);
  }

  @Get()
  async findAll(): Promise<Furnished[]> {
    return this.furnishedService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Furnished> {
    return this.furnishedService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateFurnishedDto: UpdateFurnishedDto,
  ): Promise<Furnished> {
    return this.furnishedService.update(id, updateFurnishedDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    return this.furnishedService.remove(id);
  }
}
