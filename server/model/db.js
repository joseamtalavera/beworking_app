require('dotenv').config();

const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

let poolConfig;

if (isProduction) {
    poolConfig = {
        //we could use the url. start with postgres://
        //connectionString: process.env.DATABASE_URL,
        //ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
        host: process.env.AWS_HOST,
        port: process.env.AWS_PORT,
        database: process.env.AWS_DATABASE,
        user: process.env.AWS_USER,
        password: process.env.AWS_PASSWORD,
        ssl: {
            rejectUnauthorized: false
        },
    };
} else {
    poolConfig = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
       
    };
    
}


const pool = new Pool(poolConfig);


const createTableQuery = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    google_id VARCHAR(255),
    confirmation_token VARCHAR(255),
    email_confirmed BOOLEAN DEFAULT false,
    is_admin BOOLEAN DEFAULT false,
    -- Contact Details
    commercial_name VARCHAR(255),
    name VARCHAR(255),
    phone VARCHAR(255),
    type VARCHAR(255), -- supplier, customer
    category VARCHAR(255), -- cowork, nomad, meeting-room, virtual office
    status VARCHAR(255), -- converted, potential, rejected, waiting list, contacted, visitor
    -- Billing Address
    address VARCHAR(255),
    postCode VARCHAR(255),
    state VARCHAR(255),
    country VARCHAR(255),
    -- Billing Details
    registeredName VARCHAR(255),
    vat VARCHAR(255),
    paymentMethod VARCHAR(255), -- card, bank transfer, bank charge
    -- Additional Data
    additionalData TEXT
);
`;

pool.query(createTableQuery, (err, _) => {
    if (err){
        console.error('Error executing table', err.stack);
    }else {
        console.log('Table created successfully');
        const addIsAdminColumnQuery = ` 
        ALTER TABLE users
        ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false,
        ADD COLUMN IF NOT EXISTS commercial_name VARCHAR(255),
        ADD COLUMN IF NOT EXISTS name VARCHAR(255),
        ADD COLUMN IF NOT EXISTS phone VARCHAR(255),
        ADD COLUMN IF NOT EXISTS type VARCHAR(255),
        ADD COLUMN IF NOT EXISTS category VARCHAR(255),
        ADD COLUMN IF NOT EXISTS status VARCHAR(255),
        ADD COLUMN IF NOT EXISTS address VARCHAR(255),
        ADD COLUMN IF NOT EXISTS postCode VARCHAR(255),
        ADD COLUMN IF NOT EXISTS city VARCHAR(255),
        ADD COLUMN IF NOT EXISTS state VARCHAR(255),
        ADD COLUMN IF NOT EXISTS country VARCHAR(255),
        ADD COLUMN IF NOT EXISTS registeredName VARCHAR(255),
        ADD COLUMN IF NOT EXISTS vat VARCHAR(255),
        ADD COLUMN IF NOT EXISTS paymentMethod VARCHAR(255),
        ADD COLUMN IF NOT EXISTS additionalData TEXT;
        `;
        pool.query(addIsAdminColumnQuery, (err, _) => {
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