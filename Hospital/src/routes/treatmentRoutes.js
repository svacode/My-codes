// treatmentRoutes.js
import express from 'express';
import { editSql, deleteSql, createSql } from '../database/sql';

const router = express.Router();

router.post('/delete', async (req, res) => {
  const { Nurse_nurse_id, Patient_patient_id } = req.body;
  try {
    await deleteSql.deleteTreatment(Nurse_nurse_id, Patient_patient_id);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while deleting treatment record');
  }
});

router.post('/edit/:Nurse_nurse_id/:Patient_patient_id', async (req, res) => {
  const { Nurse_nurse_id, Patient_patient_id } = req.params;
  const updatedData = req.body;
  try {
    await editSql.editTreatment(Nurse_nurse_id, Patient_patient_id, updatedData);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while updating treatment record');
  }
});

router.post('/add-treatment', async (req, res) => {
  try {
    const { Nurse_nurse_id, Patient_patient_id, treat_datetime, treat_details } = req.body;
    await createSql.enterTreatment(Nurse_nurse_id, Patient_patient_id, treat_datetime, treat_details);
    res.redirect('/'); 
  } catch (error) {
    console.error('Error adding treatment:', error);
    res.status(500).send('An error occurred while adding the treatment record.');
  }
});

export default router;
