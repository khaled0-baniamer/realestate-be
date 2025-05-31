import { Inject, Injectable } from '@nestjs/common';
import { CreateBathroomDto } from './dto/create-bathroom.dto';
import { UpdateBathroomDto } from './dto/update-bathroom.dto';
import { Bathroom } from './entities/bathroom.entity';

@Injectable()
export class BathroomsService {
  constructor(
    @Inject('BATHROOMS_REPOSITORY')
    private bathroomsRepository: typeof Bathroom,
  ) {}

  async create(createBathroomDto: CreateBathroomDto) {
    const bathroom = await this.bathroomsRepository.create({
      ...createBathroomDto,
    });
    return bathroom;
  }

  async findAll() {
    const bathrooms = await this.bathroomsRepository.findAll<Bathroom>();
    return bathrooms;
  }

  async findOne(id: number) {
    const bathroom = await this.bathroomsRepository.findByPk<Bathroom>(id);
    if (!bathroom) {
      throw new Error(`Bathroom with ID ${id} not found`);
    }
    return bathroom;
  }

  async update(id: number, updateBathroomDto: UpdateBathroomDto) {
    const bathroom = await this.bathroomsRepository.findByPk<Bathroom>(id);
    if (!bathroom) {
      throw new Error(`Bathroom with ID ${id} not found`);
    }

    await bathroom.update(updateBathroomDto);
    return bathroom;
  }

  async remove(id: number) {
    const bathroom = await this.bathroomsRepository.findByPk<Bathroom>(id);
    if (!bathroom) {
      throw new Error(`Bathroom with ID ${id} not found`);
    }

    await bathroom.destroy();
    return { message: `Bathroom with ID ${id} removed successfully` };
  }
}
