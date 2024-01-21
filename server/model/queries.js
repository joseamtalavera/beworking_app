
const pool = require('./db');
app.post('/register', async (req, res) => {
  
    // Validate and sanitize req.body here...
  
    // Define the SQL query
    const text = 'INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *';
    const values = [req.body.username, req.body.email, req.body.password]; // Note: In a real app, you should hash the password before storing it
  
    try {
      // Execute the query
      const result = await pool.query(text, values);
  
      // Send a success response
      res.send(result.rows[0]);
    } catch (error) {
      // Send an error response
      res.status(500).send(error);
    }
  });