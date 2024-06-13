const pool = require('./db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getAllUsers = async () => {
    try { 
        //const result = await pool.query('SELECT * FROM users');
        const result = await pool.query(
            "SELECT id, name, email, phone, type, category, status, registered_name, country, state, city, post_code, address, vat, payment_method, TO_CHAR(created, 'DD-MM-YYYY HH24:MI:SS') as created FROM users"
        );
        return result.rows;
    } catch (error) {
        console.error('Error in getAllUsers:', error);
        throw error;
    }
};

const addUserDb = async (user) => {
    try {
        console.log('User:', user);
        const { name, email, phone, type, category, status, registered_name, country, state, city, post_code, address, vat, payment_method } = user;
        
        const password = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const result = await pool.query(
            'INSERT INTO users (name, email, phone, type, category, status, registered_name, country, state, city, post_code, address, vat, paymentMethod, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *', 
            [name, email, phone, type, category, status, registered_name, country, state, city, post_code, address, vat, payment_method, hashedPassword]
        );

        // Send the password to the user's email. It needs to be set up in the email service.

        return result.rows[0];
    } catch (error) {
        console.error('Error in addUser:', error);
        throw error;
    }
};

const updateUserDb = async (user) => {
    try {
        console.log('User:', user);
        const { id, name, email, phone, type, category, status, registered_name, country, state, city, post_code, address, vat, payment_method } = user;
        const result = await pool.query(
            'UPDATE users SET name = $1, email = $2, phone = $3, type = $4, category = $5, status = $6, registered_name = $7, country = $8, state = $9, city = $10, post_code = $11, address = $12, vat = $13, payment_method = $14 WHERE id = $15 RETURNING *',
            [name, email, phone, type, category, status, registered_name, country, state, city, post_code, address, vat, payment_method, id]
        );
        return result.rows[0];
    }
    catch (error) {
        console.error('Error in updateUser:', error);
        throw error;
    }
}

const deleteUserDb = async (id) => {
    try {
        const result = await pool.query(
            'DELETE FROM users WHERE id = $1 RETURNING *', 
            [id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error in deleteUser:', error);
        throw error;
    }
};

module.exports = {
    getAllUsers,
    addUserDb,
    updateUserDb,
    deleteUserDb
};