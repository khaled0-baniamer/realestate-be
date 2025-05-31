import { Inject, Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { District } from './entities/district.entity';
import { City } from 'src/modules/cities/entities/city.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class DistrictsService {
  constructor(
    @Inject('DISTRICTS_REPOSITORY')
    private readonly districtsModel: typeof District,
    @Inject(CACHE_MANAGER) private cacheManger: Cache,
  ) {}

  async create(createDistrictDto: CreateDistrictDto): Promise<District> {
    const district = await this.districtsModel.create({ ...createDistrictDto });
    return this.findOne(district.id); // Fetch the district with the associated city
  }

  async findAll(): Promise<District[]> {
    const cachedAllDistricts: District[] =
      await this.cacheManger.get('districts');

    if (cachedAllDistricts) {
      return cachedAllDistricts;
    }

    const districts = await this.districtsModel.findAll<District>({
      include: { model: City },
    });

    await this.cacheManger.set('districts', districts);
    return districts;
  }

  async findOne(id: number): Promise<District> {
    const district = await this.districtsModel.findByPk<District>(id, {
      include: { model: City },
    });
    if (!district) {
      throw new Error(`District with ID ${id} not found`);
    }
    return district;
  }

  async update(
    id: number,
    updateDistrictDto: UpdateDistrictDto,
  ): Promise<District> {
    const district = await this.districtsModel.findByPk<District>(id);
    if (!district) {
      throw new Error(`District with ID ${id} not found`);
    }

    await district.update(updateDistrictDto);
    return this.findOne(id); // Return the updated district with the associated city
  }

  async remove(id: number): Promise<{ message: string }> {
    const district = await this.districtsModel.findByPk<District>(id);
    if (!district) {
      throw new Error(`District with ID ${id} not found`);
    }

    await district.destroy();
    return { message: `District with ID ${id} removed successfully` };
  }

  async findDistrictByCityId(cityId: number): Promise<District[]> {
    const districts = await this.districtsModel.findAll({
      where: { cityId },
      include: { model: City },
    });
    return districts;
  }
}
