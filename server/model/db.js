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
    contact_person VARCHAR(255),
    phone VARCHAR(255),
    type VARCHAR(255), -- supplier, customer
    category VARCHAR(255), -- cowork, nomad, meeting-room, virtual office
    status VARCHAR(255), -- converted, potential, rejected, waiting list, contacted, visitor
    -- Billing Address
    street_and_number VARCHAR(255),
    post_code VARCHAR(255),
    county VARCHAR(255),
    country VARCHAR(255),
    -- Billing Details
    registered_name VARCHAR(255),
    vat VARCHAR(255),
    payment_method VARCHAR(255), -- card, bank transfer, bank charge
    -- Additional Data
    additional_data TEXT
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
        ADD COLUMN IF NOT EXISTS contact_person VARCHAR(255),
        ADD COLUMN IF NOT EXISTS phone VARCHAR(255),
        ADD COLUMN IF NOT EXISTS type VARCHAR(255),
        ADD COLUMN IF NOT EXISTS category VARCHAR(255),
        ADD COLUMN IF NOT EXISTS status VARCHAR(255),
        ADD COLUMN IF NOT EXISTS street_and_number VARCHAR(255),
        ADD COLUMN IF NOT EXISTS post_code VARCHAR(255),
        ADD COLUMN IF NOT EXISTS county VARCHAR(255),
        ADD COLUMN IF NOT EXISTS country VARCHAR(255),
        ADD COLUMN IF NOT EXISTS registered_name VARCHAR(255),
        ADD COLUMN IF NOT EXISTS vat VARCHAR(255),
        ADD COLUMN IF NOT EXISTS payment_method VARCHAR(255),
        ADD COLUMN IF NOT EXISTS additional_data TEXT;
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