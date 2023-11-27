const { Pool } = require('pg');
import dotenv from 'dotenv'
dotenv.config()


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
});


pool.connect((error, client) => {
    if(error) {
        console.log('Erro ao se conectar com o postgreSQL');
    } else {
        const createTableQuery = 
        ` 
          CREATE TABLE IF NOT EXISTS users (
           id SERIAL PRIMARY KEY,
           name VARCHAR(30) NOT NULL,
           email VARCHAR(70) NOT NULL,
           password VARCHAR(255) NOT NULL
         );`

        client.query(createTableQuery, (error, result) => {
            if(error) {
                console.log('erro ao criar tabelas estudantes');
            } else {
                console.log('Tabelas users criada com sucesso!');
            }
        
            client.release();
        })
    }
});



export default pool;