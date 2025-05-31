import { Inject, Injectable } from '@nestjs/common';
import { CreateFurnishedDto } from './dto/create-furnished.dto';
import { UpdateFurnishedDto } from './dto/update-furnished.dto';
import { Furnished } from './entities/furnished.entity';

@Injectable()
export class FurnishedService {
  constructor(
    @Inject('FURNISHED_REPOSITORY')
    private readonly furnishedModel: typeof Furnished,
  ) {}

  async create(createFurnishedDto: CreateFurnishedDto): Promise<Furnished> {
    const furnished = await this.furnishedModel.create({...createFurnishedDto});
    return furnished;
  }

  async findAll(): Promise<Furnished[]> {
    const furnishedItems = await this.furnishedModel.findAll<Furnished>();
    return furnishedItems;
  }

  async findOne(id: number): Promise<Furnished> {
    const furnished = await this.furnishedModel.findByPk<Furnished>(id);
    if (!furnished) {
      throw new Error(`Furnishing option with ID ${id} not found`);
    }
    return furnished;
  }

  async update(id: number, updateFurnishedDto: UpdateFurnishedDto): Promise<Furnished> {
    const furnished = await this.furnishedModel.findByPk<Furnished>(id);
    if (!furnished) {
      throw new Error(`Furnishing option with ID ${id} not found`);
    }
    
    await furnished.update(updateFurnishedDto);
    return furnished;
  }

  async remove(id: number): Promise<{ message: string }> {
    const furnished = await this.furnishedModel.findByPk<Furnished>(id);
    if (!furnished) {
      throw new Error(`Furnishing option with ID ${id} not found`);
    }
    
    await furnished.destroy();
    return { message: `Furnishing option with ID ${id} removed successfully` };
  }
}
