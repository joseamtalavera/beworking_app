
const pool = require('./db');

exports.createUser = async (userid) => {

  try {
  // Check if a user with this Google ID already exists in the database
    const existingUser = await pool.query('SELECT * FROM users WHERE google_id = $1', [userid]);

    if (existingUser.rows.length === 0) {
    // If not, create a new user
      const newUser = await pool.query('INSERT INTO users(google_id) VALUES($1) RETURNING *', [userid]);
      return newUser.rows[0];
    }
  // If the user already exists, return the user.
    return existingUser.rows[0];
  } catch (error) {
    console.error('Error in createUser:', error);
    throw error;
  }
};