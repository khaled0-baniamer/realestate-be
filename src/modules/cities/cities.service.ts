import { Inject, Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './entities/city.entity';
import { Country } from 'src/modules/countries/entities/country.entity';

@Injectable()
export class CitiesService {
  constructor(
    @Inject('CITIES_REPOSITORY')
    private readonly citiesModel: typeof City,
  ) {}

  async create(createCityDto: CreateCityDto): Promise<City> {
    const city = await this.citiesModel.create({ ...createCityDto });
    return this.findOne(city.id); // Fetch the city with the associated country
  }

  async findAll(): Promise<City[]> {
    const cities = await this.citiesModel.findAll<City>({
      include: { model: Country },
    });
    return cities;
  }

  async findOne(id: number): Promise<City> {
    const city = await this.citiesModel.findByPk<City>(id, {
      include: { model: Country },
    });
    if (!city) {
      throw new Error(`City with ID ${id} not found`);
    }
    return city;
  }

  async update(id: number, updateCityDto: UpdateCityDto): Promise<City> {
    const city = await this.citiesModel.findByPk<City>(id);
    if (!city) {
      throw new Error(`City with ID ${id} not found`);
    }

    await city.update(updateCityDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const city = await this.citiesModel.findByPk<City>(id);
    if (!city) {
      throw new Error(`City with ID ${id} not found`);
    }

    await city.destroy();
    return { message: `City with ID ${id} removed successfully` };
  }
}
