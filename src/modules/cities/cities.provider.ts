import { City } from './entities/city.entity';

export const citiesProviders = [
  {
    provide: 'CITIES_REPOSITORY',
    useValue: City,
  },
];
