var moment = require('moment');
const pool = require('./pool');

const getAppointmentsListByEmail = async (owner_email) => {
	const results = await pool.query('SELECT * FROM nimedix_appointments WHERE owner_email=$1', [owner_email]);
	return results.rows;
}

const createAppointments = async (owner_email, partner_email, partner_name, type, time,duration) => {
	const results = await pool.query('INSERT INTO nimedix_appointments(owner_email, partner_email, partner_name, type, time,duration) VALUES ($1, $2, $3,$4, $5, $6) RETURNING *', [owner_email, partner_email, partner_name, type, time,duration]);
		return { success: true, rows: results.rows };
}

const updateAppointments = async (id, owner_email, partner_email, partner_name, type, time,duration) => {
	const results =
		await pool.query(`
		UPDATE 
		nimedix_appointments
		SET
		owner_email=$2, partner_email=$3, partner_name=$4, type=$5, time=$6, duration=$7
		WHERE
			id=$1
		RETURNING *`, [id, owner_email, partner_email, partner_name, type, time,duration]);

  if (results.rows && results.rows.length > 0)
    return results.rows[0];
  else
    return null;
}

const deleteAppointments = async (id) => {
		await pool.query(`
            DELETE FROM 
            nimedix_appointments
            WHERE
                id=$1`, [id]);
        return true;
}

module.exports = {
	getAppointmentsListByEmail,
	createAppointments,
	updateAppointments,
    deleteAppointments
};