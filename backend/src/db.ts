import { DataSource } from 'typeorm'

export default new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: process.env.POSTGRES_USER, //process.env.POSTGRES_USER
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: true, //en dev, en prod on préfera utiliser les migrations
  logging: true,
  entities: ['src/entities/*.ts'],
})
