import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './entities/city.entity';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  async create(@Body() createCityDto: CreateCityDto): Promise<City> {
    return this.citiesService.create(createCityDto);
  }

  @Get()
  async findAll(): Promise<City[]> {
    return this.citiesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<City> {
    return this.citiesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCityDto: UpdateCityDto,
  ): Promise<City> {
    return this.citiesService.update(id, updateCityDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    return this.citiesService.remove(id);
  }
}
