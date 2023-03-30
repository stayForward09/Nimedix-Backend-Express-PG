var moment = require('moment');
const pool = require('./pool');

const getAssetsById = async () => {
	const results = await pool.query('SELECT * FROM nimedix_assets WHERE id=$1', [id]);
	return results.rows;
}

const createAssets = async (name, key, mimeType, size, date) => {
	const results = await pool.query('INSERT INTO nimedix_assets(name, key, mimeType, size, date) VALUES ($1, $2, $3,$4,$5) RETURNING *', [name, key, mimeType, size, date]);
		return { success: true, rows: results.rows };
}



const deleteAssetsById = async (id) => {
		await pool.query(`
            DELETE FROM 
            nimedix_assets
            WHERE
                id=$1`, [id]);
        return true;
}

module.exports = {
	getAssetsById,
	createAssets,
	deleteAssetsById
};