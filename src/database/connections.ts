import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConnectionOptions as BaseConnectionOptions } from 'typeorm';
import { DEFAULT_CONNECTION } from './constants';
require('dotenv').config();


type ConnectionOptions = BaseConnectionOptions & {
    seeds?: string[];
    factories?: string[];
};

export const getConnections = (): ConnectionOptions[] => [
    {
        name: DEFAULT_CONNECTION,

        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [__dirname + '/../**/*.model.{js,ts}'],
        migrations: ['dist/src/db/migrations.js'],
        synchronize: process.env.DB_SYNCHRONIZE === 'true',
        logging: process.env.DB_LOGGING === 'true',
        seeds: [],
        factories: [],
    },
];

export const getDefaultConnection = (): ConnectionOptions => getConnections().find(i => i.name === DEFAULT_CONNECTION);
