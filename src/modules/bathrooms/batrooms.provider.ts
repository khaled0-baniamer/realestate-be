import { Bathroom } from "./entities/bathroom.entity";

export const bathroomsProviders = [
  {
    provide: 'BATHROOMS_REPOSITORY',
    useValue: Bathroom,
  },
];