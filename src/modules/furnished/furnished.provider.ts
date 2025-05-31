import { Furnished } from './entities/furnished.entity';

export const furnishedProviders = [
  {
    provide: 'FURNISHED_REPOSITORY',
    useValue: Furnished,
  },
];
