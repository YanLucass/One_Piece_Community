import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
 connectionString: process.env.DATABASE_URL,
 ssl: {
    rejectUnauthorized: false
 }
});

pool.connect((error, client) => {
  if (error) {
    console.error('Erro ao se conectar com o PostgreSQL:', error.message);
  } else {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        email VARCHAR(70) NOT NULL,
        password VARCHAR(255) NOT NULL, 
        image VARCHAR(255)

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
