import express from "express";
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
    }
})