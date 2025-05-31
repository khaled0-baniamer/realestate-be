import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BedroomsService } from './bedrooms.service';
import { CreateBedroomDto } from './dto/create-bedroom.dto';
import { UpdateBedroomDto } from './dto/update-bedroom.dto';
import { Bedroom } from './entities/bedroom.entity';

@Controller('bedrooms')
export class BedroomsController {
  constructor(private readonly bedroomsService: BedroomsService) {}

  @Post()
  async create(@Body() createBedroomDto: CreateBedroomDto): Promise<Bedroom> {
    return this.bedroomsService.create(createBedroomDto);
  }

  @Get()
  async findAll(): Promise<Bedroom[]> {
    return this.bedroomsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Bedroom> {
    return this.bedroomsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateBedroomDto: UpdateBedroomDto,
  ): Promise<Bedroom> {
    return this.bedroomsService.update(id, updateBedroomDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    return this.bedroomsService.remove(id);
  }
}
