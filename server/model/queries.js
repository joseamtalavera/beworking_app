
const pool = require('./db');

const createUser = async (userid, email, password) => {
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
        newUser = await pool.query('INSERT INTO users(email, password) VALUES($1, $2) RETURNING *', [email, password]);
      }
      return newUser.rows[0];
  
      
      } catch (error) {
      console.error('Error in createUser:', error);
      throw error;
      }
};

module.exports = {
  createUser
};