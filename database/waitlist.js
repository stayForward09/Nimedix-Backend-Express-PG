const pool = require('./pool')

const addEmail = async (email) => {
  const res = await pool.query('SELECT * FROM nimedix_waitlist WHERE email=$1', [email]);
  if (res.rows.length > 0) {
    return {success: false, rows: res.rows}
  } else {
    const result = await pool.query('INSERT INTO nimedix_waitlist(email, created_at) VALUES($1, DEFAULT)', [email])
    return {success: true, rows: result.rows}
  }
}

module.exports={
  addEmail
}