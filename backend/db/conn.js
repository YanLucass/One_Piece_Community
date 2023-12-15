import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
});

pool.connect((error, client) => {
  if (error) {
    console.error('Erro ao se conectar com o PostgreSQL:', error.message);
  } else {
    // Apenas para testes com ElephantSQL
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        email VARCHAR(70) NOT NULL,
        password VARCHAR(255) NOT NULL, 
        image VARCHAR(255)

      );

      CREATE TABLE IF NOT EXISTS toughts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        content VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_id INT REFERENCES users(id) 
      );

      CREATE TABLE IF NOT EXISTS wanoToughts (
          id SERIAL PRIMARY KEY,
          title varchar(255),
          content text,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          user_id smallint REFERENCES users(id)
      );

      CREATE TABLE IF NOT EXISTS comments (
        content text NOT NULL, 
        tought_id smallint REFERENCES toughts(id),
        user_id smallint REFERENCES users(id)

      );

    `;

    client.query(createTableQuery, (error, result) => {
      if (error) {
        console.error('Erro ao criar tabela users:', error.message);
      } else {
        console.log('Tabelas criadas');
      }

      client.release();
    });
  }
});

export default pool;
