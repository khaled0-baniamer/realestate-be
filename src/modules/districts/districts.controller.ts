import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DistrictsService } from './districts.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { District } from './entities/district.entity';

@Controller('districts')
export class DistrictsController {
  constructor(private readonly districtsService: DistrictsService) {}

  @Post()
  async create(@Body() createDistrictDto: CreateDistrictDto): Promise<District> {
    return this.districtsService.create(createDistrictDto);
  }

  @Get()
  async findAll(): Promise<District[]> {
    return this.districtsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<District> {
    return this.districtsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ): Promise<District> {
    return this.districtsService.update(id, updateDistrictDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    return this.districtsService.remove(id);
  }

  @Get('city/:cityId')
  async findDistrictByCityId(@Param('cityId') cityId: number): Promise<District[]> {
    return this.districtsService.findDistrictByCityId(cityId);
  }
}
