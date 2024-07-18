// examinationRoutes.js
import express from 'express';
import pool from '../database/sql';
const promisePool = pool.promise();
const router = express.Router();
router.post('/search-patients', async (req, res) => {
    const { patientName, patientSocSecNum, patientPhoneNum } = req.body;

    let query = 'SELECT * FROM Patient WHERE TRUE';
    const values = [];

    if (patientName) {
        query += ' AND patient_name LIKE ?';
        values.push(`%${patientName}%`);
    }

    if (patientSocSecNum) {
        query += ' AND patient_soc_secnum = ?';
        values.push(patientSocSecNum);
    }

    if (patientPhoneNum) {
        query += ' AND patient_phonenum = ?';
        values.push(patientPhoneNum);
    }

    try {
        const [rows] = await promisePool.query(query, values);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while searching for patients');
    }
});

export default router;
