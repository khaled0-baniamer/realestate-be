import { Inject, Injectable } from '@nestjs/common';
import { CreateBedroomDto } from './dto/create-bedroom.dto';
import { UpdateBedroomDto } from './dto/update-bedroom.dto';
import { Bedroom } from './entities/bedroom.entity';

@Injectable()
export class BedroomsService {
  constructor(
    @Inject('BEDROOMS_REPOSITORY')
    private readonly bedroomsModel: typeof Bedroom,
  ) {}

  async create(createBedroomDto: CreateBedroomDto): Promise<Bedroom> {
    const bedroom = await this.bedroomsModel.create({ ...createBedroomDto });
    return bedroom;
  }

  async findAll(): Promise<Bedroom[]> {
    const bedrooms = await this.bedroomsModel.findAll<Bedroom>();
    return bedrooms;
  }

  async findOne(id: number): Promise<Bedroom> {
    const bedroom = await this.bedroomsModel.findByPk<Bedroom>(id);
    if (!bedroom) {
      throw new Error(`Bedroom with ID ${id} not found`);
    }
    return bedroom;
  }

  async update(
    id: number,
    updateBedroomDto: UpdateBedroomDto,
  ): Promise<Bedroom> {
    const bedroom = await this.bedroomsModel.findByPk<Bedroom>(id);
    if (!bedroom) {
      throw new Error(`Bedroom with ID ${id} not found`);
    }

    await bedroom.update(updateBedroomDto);
    return bedroom;
  }

  async remove(id: number): Promise<{ message: string }> {
    const bedroom = await this.bedroomsModel.findByPk<Bedroom>(id);
    if (!bedroom) {
      throw new Error(`Bedroom with ID ${id} not found`);
    }

    await bedroom.destroy();
    return { message: `Bedroom with ID ${id} removed successfully` };
  }
}
