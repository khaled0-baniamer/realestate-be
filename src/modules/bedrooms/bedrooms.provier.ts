import { Bedroom } from './entities/bedroom.entity';

export const bedroomsProviders = [
  {
    provide: 'BEDROOMS_REPOSITORY',
    useValue: Bedroom,
  },
];
