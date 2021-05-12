import { SequelizeOptions } from 'sequelize-typescript';
import { Dialect } from 'sequelize/types';
import { PRODUCTION } from 'src/constants';

export function dbConfigOptions(): SequelizeOptions {
  if (process.env.NODE_ENV === PRODUCTION) {
    return {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      dialect: process.env.DB_DIALECT as Dialect,
      define: {
        underscored: true,
      },
      ssl: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    };
  } else {
    return {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      dialect: process.env.DB_DIALECT as Dialect,
      define: {
        underscored: true,
      },
    };
  }
};
