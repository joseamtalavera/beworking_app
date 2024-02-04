require('dotenv').config();

/* const { Pool } = require('pg');

const pool= new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port:process.env.DB_PORT,
}); 

module.exports = pool;
*/


const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

let poolConfig;

if (isProduction) {
    // For production, use DATABASE_URL
    poolConfig = {
        connectionString: process.env.DATABASE_URL,
        //ssl: { rejectUnauthorized: false },
        ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    };
    console.log(process.env.DATABASE_URL);
} else {
    // For local development, use individual environment variables
    poolConfig = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        // Assume SSL is not needed for local development, adjust as necessary
    };
}

const pool = new Pool(poolConfig);
/* 
const email = 'test@example.com'; // replace with the email you want to insert
const password = 'testpassword'; // replace with the password you want to insert
pool.query('INSERT INTO users(email, password) VALUES($1, $2) RETURNING *', [email, password], (err, res) => {
    if (err) {
        console.error('Error executing query', err.stack);
    } else {
        console.log('Email inserted successfully');
    }
}); */

module.exports = pool;


/*
client.connect(err => {
    if (err){
        console.error('connection error', err.stack)
    } else {
        console.log('connected')
        //test query
        client.query('SELECT NOW()', (err, res) => {
            if (err){
                console.log(err);
            } else {
                console.log(res.rows[0]);
            }
            client.end();
        });
    }
});
module.exports = client;
*/