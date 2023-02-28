const pool = require('./pool');

const signInWithEmailAndPassword = async (email, password) => {
	const results = await pool.query('SELECT * FROM users WHERE email=$1 AND password=$2', [email, password]);
	return results.rows;
}

const createUserWithEmailAndPassword = async (name, email, password, role = 1,) => {
	const results = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
	if (results.rows.length > 0) {
		return { success: false };
	} else {
		results = await pool.query('INSERT INTO users(name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *', [name, email, password, role]);
		return { success: true, rows: results.rows };
	}
}



module.exports = {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
};