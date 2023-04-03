var moment = require('moment');
const pool = require('./pool');

const getServiceInfoList = async () => {
	const results = await pool.query('SELECT * FROM nimedix_services_offered', []);
	return results.rows;
}

const createServiceInfo = async (service_name, service_detail, service_img) => {
	const results = await pool.query('INSERT INTO nimedix_services_offered(service_name, service_detail, service_img) VALUES ($1, $2, $3) RETURNING *', [service_name,service_detail, service_img]);
		return { success: true, rows: results.rows };
}

const updateServiceInfo = async (service_id,service_name, service_detail, service_img) => {
	const results =
		await pool.query(`
		UPDATE 
		nimedix_services_offered
		SET
			service_name=$2, service_detail=$3, service_img=$4
		WHERE
			id=$1
		RETURNING *`, [service_id, service_name, service_detail, service_img]);

  if (results.rows && results.rows.length > 0)
    return results.rows[0];
  else
    return null;
}

const deleteServiceInfo = async (service_id) => {
		await pool.query(`
            DELETE FROM 
            nimedix_services_offered
            WHERE
                id=$1`, [service_id]);
        return true;
}

module.exports = {
	getServiceInfoList,
	createServiceInfo,
	updateServiceInfo,
	deleteServiceInfo
};