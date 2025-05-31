import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

export const databaseConfig = {
  dialect: (process.env.DATABASE_DIALECT || 'mysql') as 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
};
