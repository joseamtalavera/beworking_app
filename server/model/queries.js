
const pool = require('./db');

const createUser = async (userid, email, password, hashedPassword, confirmationToken) => {
  console.log(email, password);
  try {
    // Check if the user already exists
    let existingUser;
    if (userid) {
      existingUser = await pool.query('SELECT * FROM users WHERE google_id = $1', [userid]);
    } else {
      existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    }

      //if (existingUser.rows.length === 0) {
      if (existingUser.rows.length > 0) {
        throw new Error('User already exists');
      }
      // If not, create a new user
      let newUser;
      if (userid) {
        newUser = await pool.query('INSERT INTO users(google_id) VALUES($1) RETURNING *', [userid]);
      } else if (email && password) {
        newUser = await pool.query('INSERT INTO users(email, password, confirmation_token, email_confirmed) VALUES($1, $2, $3, $4) RETURNING *', [email, password, confirmationToken, false]);
      }
      return newUser.rows[0];
  
      
      } catch (error) {
      console.error('Error in createUser:', error);
      throw error;
      }
};

const getUserByEmail = async (email) => {
  try {
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return existingUser.rows[0];
  } catch (error) {
    console.error('Error in getUserByEmail:', error);
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const existingUser = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return existingUser.rows[0];
  } catch (error) {
    console.error('Error in getUserById:', error);
    throw error;
  }
};

const getUserByConfirmationToken = async (token) => {
    try {
      const existingUser = await pool.query('SELECT * FROM users WHERE confirmation_token = $1', [confirmationToken]);
      return existingUser.rows[0];
    } catch (error) {
      console.error('Error in getUserByConfirmationToken:', error);
      throw error;
    }
  };

// confirm email in db
const confirmUserEmail = async (id) => {
  try {
    await pool.query('UPADATE users SET email_confirmed = true WHERE id = $1', [true, id]);
  } catch (error) {
    console.error('Error in confirmUserEmail:', error);
    throw error;
  }
};

  module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    getUserByConfirmationToken,
    confirmUserEmail
  };
