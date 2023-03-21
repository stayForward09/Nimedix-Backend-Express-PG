var moment = require('moment');
const pool = require('./pool');

const signInWithEmailAndPassword = async (email, password) => {
	const results = await pool.query('SELECT * FROM nimedix_user WHERE email=$1 AND password=$2', [email, password]);
	return results.rows;
}

const createUserWithEmailAndPassword = async (email, full_name, phone_number, address, dob, photo, password, username, user_role) => {
	const results = await pool.query('SELECT * FROM nimedix_user WHERE email=$1', [email]);
	if (results.rows.length > 0) {
		return { success: false };
	} else {
		var wallet_address = "dfdfjdkgjdkfjsdlkjfk"
		results = await pool.query('INSERT INTO nimedix_user(email, full_name, phone_number, address, dob, photo, pass, username, user_role, wallet_address) VALUES ($1, $2, $3, $4,$5, $6, $7, $8,$9, $10) RETURNING *', [email, full_name, phone_number, address, dob, photo, password, username, user_role, wallet_address]);
		return { success: true, rows: results.rows };
	}
}
const resetPassword = async(value, newPassword, method) => {
	let query = "";
	if(method=="email"){
		query = 'UPDATE nimedix_user SET pass=$2 WHERE email=$1 RETURNING *'
	} else{
		query = 'UPDATE nimedix_user SET pass=$2 WHERE phone_number=$1 RETURNING *'
	}
	const results = await pool.query(`
		${query}
	`, [email, newPassword]);

	return (results.rows && results.rows.length > 0) ? results.rows[0] : null;
}
const email_otp = async (email, code, status) => {
	const now = moment();
	console.log(now);
	const results = await pool.query('INSERT INTO nimedix_email_otp(email, code, status, created_at) VALUES ($1, $2, $3, $4)', [email, code, status, now]);
	return { success: true};
}
const verify_email_otp = async (email, code) => {
	const results = await pool.query('SELECT * FROM nimedix_email_otp WHERE email=$1 ORDER BY created_at DESC LIMIT 1', [email]);
	if (results.rows.length > 0) {
		if(results.rows[0].status == 'pending'){

			if(results.rows[0].code == code) {
				const then = moment(results.rows[0].created_at, "YYYY-MM-DD'T'HH:mm:ss:SSSZ");
				const now = moment();
				const diff = moment.duration(now.diff(then)).asMinutes();
				console.log("diff==>>>", diff, now, then);
				if(diff < 555 ){
					await pool.query(`
						UPDATE nimedix_email_otp SET status = $1 WHERE id = $2
						`, ["verified", results.rows[0].id]);
					return {code: "otp/email-otp-verification-success",  message: "email otp verified successfully."}
				} else{
					return {code: "otp/email-otp-verification-error",  message: "Already expired."}
				}
			} else{
				return {code: "otp/email-otp-verification-error",  message: "Wrong code. please check your email again."}
			}
		} else{
			return {code: "otp/email-otp-verification-error",  message: "Already verified."}
		}
	} else{
		return {code: "otp/email-otp-verification-error",  message: "It couldn't find matched data. Wrong email address"}
	}
}
module.exports = {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	resetPassword,
	email_otp,
	verify_email_otp
};