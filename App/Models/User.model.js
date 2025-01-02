const conn = require('../common/connect');

class User {
    static async findByUsername(username) {
      const [rows] = await conn.execute('SELECT * FROM users WHERE username = ?', [username]);
      return rows[0];
    }
  
    static async findByEmail(email) {
      const [rows] = await conn.execute('SELECT * FROM users WHERE email = ?', [email]);
      return rows[0];
    }
  
    static async create({ username, email, password, role }) {
      await conn.execute(
        'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
        [username, email, password, role]
      );
    }
  }
  
  module.exports = User;