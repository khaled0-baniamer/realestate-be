import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './constant';
import { DBModels } from './models';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(databaseConfig);
      sequelize.addModels(DBModels);
      await sequelize.sync();
      return sequelize;
    },
  },
];
