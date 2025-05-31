import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TypesService } from './types.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Type } from './entities/type.entity';

@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Post()
  async create(@Body() createTypeDto: CreateTypeDto): Promise<Type> {
    return this.typesService.create(createTypeDto);
  }

  @Get()
  async findAll(): Promise<Type[]> {
    return this.typesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Type> {
    return this.typesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTypeDto: UpdateTypeDto,
  ): Promise<Type> {
    return this.typesService.update(id, updateTypeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    return this.typesService.remove(id);
  }
}
