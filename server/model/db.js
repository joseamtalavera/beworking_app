require('dotenv').config();
const { Pool } = require('pg');

const pool= new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port:process.env.DB_PORT,
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