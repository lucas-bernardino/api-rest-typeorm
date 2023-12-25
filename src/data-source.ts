import 'dotenv/config'
import 'reflect-metadata'

import { DataSource } from "typeorm";

const port = process.env.DB_PORT as number | undefined;

// inicia conexao com o PostgreSQL
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [`${__dirname}/**/entities/*.{ts,js}`], // passa ts,js pois em desenv. usa ts e prod. js (tem q usar o ** pois vai ter a pasta dist tbm)
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`], // passa ts,js pois em desenv. usa ts e prod. js (tem q usar o ** pois vai ter a pasta dist tbm)
});

