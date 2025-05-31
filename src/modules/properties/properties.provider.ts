import { Property } from './entities/property.entity';

export const propertiesProviders = [
  {
    provide: 'PROPERTIES_REPOSITORY',
    useValue: Property,
  },
];
