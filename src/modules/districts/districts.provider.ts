import { District } from './entities/district.entity';

export const districtsProviders = [
  {
    provide: 'DISTRICTS_REPOSITORY',
    useValue: District,
  },
];
