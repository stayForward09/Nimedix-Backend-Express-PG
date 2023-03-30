var moment = require('moment');
const pool = require('./pool');

const getVitalsByEmail = async (email) => {
	const results = await pool.query(`SELECT * FROM nimedix_vitals WHERE email=$1`, [email]);
	return results.rows;
}

const createVitalsByEmail = async (email, heartRate, O2Saturation, respirationRate, bodyTemp, bloodSugar) => {
	const results = await pool.query('INSERT INTO nimedix_vitals(email, heartRate, O2Saturation, respirationRate, bodyTemp, bloodSugar) VALUES ($1, $2, $3) RETURNING *', [email, heartRate, O2Saturation, respirationRate, bodyTemp, bloodSugar]);
		return { success: true, rows: results.rows };
}

const updateVitalsByEmail = async (email, heartRate, O2Saturation, respirationRate, bodyTemp, bloodSugar) => {
	const results =
		await pool.query(`
		UPDATE 
		nimedix_vitals
		SET
			email=$2, heartRate=$3, O2Saturation=$4
		WHERE
			id=$1
		RETURNING *`, [email, heartRate, O2Saturation, respirationRate, bodyTemp, bloodSugar]);

  if (results.rows && results.rows.length > 0)
    return results.rows[0];
  else
    return null;
}

const updateTakeMedichineStatusByEmail = async (email, takeMedicine,status ) => {
	const results =
		await pool.query(`
		UPDATE 
		nimedix_vitals
		SET
            takeMedicine=$2, status=$3, service_img=$4
		WHERE
            email=$1
		RETURNING *`, [email, takeMedicine,status]);

  if (results.rows && results.rows.length > 0)
    return results.rows[0];
  else
    return null;
}



module.exports = {
	getVitalsByEmail, 
    createVitalsByEmail,
    updateVitalsByEmail,
    updateTakeMedichineStatusByEmail
};