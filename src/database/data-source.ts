import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.POSTGRES_DB_HOST ?? 'localhost',
	port: Number(process.env.POSTGRES_DB_PORT ?? 5432),
	username: process.env.POSTGRES_DB_USER ?? 'postgres',
	password: process.env.POSTGRES_DB_PASS ?? 'password',
	database: process.env.POSTGRES_DB_NAME ?? 'mydb',
    entities: [__dirname + '/../services/**/entities/*.entity{.js,.ts}'],
	migrations: [__dirname + '/migrations/*{.js,.ts}', __dirname + '/seeders/*{.js,.ts}']
});
