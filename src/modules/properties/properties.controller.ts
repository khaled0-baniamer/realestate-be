import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { Property } from './entities/property.entity';
import { CreatePropertyDto, FilterPropertyDto, UpdatePropertyDto } from './dto';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  async create(
    @Body() createPropertyDto: CreatePropertyDto,
  ): Promise<Property> {
    return this.propertiesService.create(createPropertyDto);
  }

  @Post('search')
  async findAll(
    @Body() filters: FilterPropertyDto,
  ): Promise<{ data: Property[]; page: number; size: number }> {
    return this.propertiesService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Property> {
    return this.propertiesService.findOne(id);
  }
  @Get('similar/:id')
  async findSimilar(@Param('id') id: number): Promise<Property[]> {
    return this.propertiesService.similarProperty(id);
  }
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ): Promise<Property> {
    return this.propertiesService.update(id, updatePropertyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    return this.propertiesService.remove(id);
  }
}
