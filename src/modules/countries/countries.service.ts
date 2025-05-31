import { Inject, Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './entities/country.entity';

@Injectable()
export class CountriesService {
  constructor(
    @Inject('COUNTRIES_REPOSITORY')
    private readonly countriesModel: typeof Country,
  ) {}

  async create(createCountryDto: CreateCountryDto): Promise<Country> {
    const country = await this.countriesModel.create({...createCountryDto});
    return country;
  }

  async findAll(): Promise<Country[]> {
    const countries = await this.countriesModel.findAll<Country>();
    return countries;
  }

  async findOne(id: number): Promise<Country> {
    const country = await this.countriesModel.findByPk<Country>(id);
    if (!country) {
      throw new Error(`Country with ID ${id} not found`);
    }
    return country;
  }

  async update(id: number, updateCountryDto: UpdateCountryDto): Promise<Country> {
    const country = await this.countriesModel.findByPk<Country>(id);
    if (!country) {
      throw new Error(`Country with ID ${id} not found`);
    }
    
    await country.update(updateCountryDto);
    return country;
  }

  async remove(id: number): Promise<{ message: string }> {
    const country = await this.countriesModel.findByPk<Country>(id);
    if (!country) {
      throw new Error(`Country with ID ${id} not found`);
    }
    
    await country.destroy();
    return { message: `Country with ID ${id} removed successfully` };
  }
}
