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

// if (isProduction) {
//     // For production, use DATABASE_URL
//     poolConfig = {
//         connectionString: process.env.DATABASE_URL,
//         //ssl: { rejectUnauthorized: false },
//         ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
//     };
//     console.log(process.env.DATABASE_URL);
// } else {
//     // For local development, use individual environment variables
//     poolConfig = {
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT,
//         database: process.env.DB_DATABASE,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         // Assume SSL is not needed for local development, adjust as necessary
//     };
// }


if (isProduction) {
    // For production, use DATABASE_URL
    poolConfig = {
        //we could use the url. start with postgres://
        //connectionString: process.env.DATABASE_URL,
        //ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
        host: process.env.AWS_HOST,
        port: process.env.AWS_PORT,
        database: process.env.AWS_DATABASE,
        user: process.env.AWS_USER,
        password: process.env.AWS_PASSWORD,
        ssl: process.env.AWS_SSL,
    };
    //console.log('Production DATABASE_URL:', process.env.DATABASE_URL);
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
    //console.log("process.env.DB_HOST:", process.env.DB_HOST);
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

const createTableQuery = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    google_id VARCHAR(255),
    confirmation_token VARCHAR(255),
    email_confirmed BOOLEAN DEFAULT false
);
`;

pool.query(createTableQuery, (err, res) => {
    if (err){
        console.error('Error executing table', err.stack);
    }else {
        console.log('Table created successfully');
        const addIsAdminColumnQuery = ` 
        ALTER TABLE users
        ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;
        `;
        pool.query(addIsAdminColumnQuery, (err, res) => {
            if (err){
                console.error('Error executing query', err.stack);
            } else {
                console.log('is_admin column added successfully');
            }
        });
    }
});



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