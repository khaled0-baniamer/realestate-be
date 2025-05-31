import { Country } from './entities/country.entity';

export const countriesProviders = [
  {
    provide: 'COUNTRIES_REPOSITORY',
    useValue: Country,
  },
];
