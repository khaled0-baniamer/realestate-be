import { Inject, Injectable } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Type } from './entities/type.entity';

@Injectable()
export class TypesService {
  constructor(
    @Inject('TYPES_REPOSITORY') private readonly typesModel: typeof Type,
  ) {}

  async create(createTypeDto: CreateTypeDto): Promise<Type> {
    const type = await this.typesModel.create({...createTypeDto});
    return type;
  }

  async findAll(): Promise<Type[]> {
    const types = await this.typesModel.findAll<Type>();
    return types;
  }

  async findOne(id: number): Promise<Type> {
    const type = await this.typesModel.findByPk<Type>(id);
    if (!type) {
      throw new Error(`Type with ID ${id} not found`);
    }
    return type;
  }

  async update(id: number, updateTypeDto: UpdateTypeDto): Promise<Type> {
    const type = await this.typesModel.findByPk<Type>(id);
    if (!type) {
      throw new Error(`Type with ID ${id} not found`);
    }
    
    await type.update(updateTypeDto);
    return type;
  }

  async remove(id: number): Promise<{ message: string }> {
    const type = await this.typesModel.findByPk<Type>(id);
    if (!type) {
      throw new Error(`Type with ID ${id} not found`);
    }
    
    await type.destroy();
    return { message: `Type with ID ${id} removed successfully` };
  }
}
