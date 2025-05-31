import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BathroomsService } from './bathrooms.service';
import { CreateBathroomDto } from './dto/create-bathroom.dto';
import { UpdateBathroomDto } from './dto/update-bathroom.dto';
import { Bathroom } from './entities/bathroom.entity';

@Controller('bathrooms')
export class BathroomsController {
  constructor(private readonly bathroomsService: BathroomsService) {}

  @Post()
  async create(@Body() createBathroomDto: CreateBathroomDto): Promise<Bathroom> {
    return this.bathroomsService.create(createBathroomDto);
  }

  @Get()
  async findAll(): Promise<Bathroom[]> {
    return this.bathroomsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Bathroom> {
    return this.bathroomsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateBathroomDto: UpdateBathroomDto,
  ): Promise<Bathroom> {
    return this.bathroomsService.update(id, updateBathroomDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    return this.bathroomsService.remove(id);
  }
}
