import { Type } from './entities/type.entity';

export const typesProviders = [
  {
    provide: 'TYPES_REPOSITORY',
    useValue: Type,
  },
];
