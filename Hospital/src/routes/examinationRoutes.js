import express from 'express';
import { editSql, deleteSql, createSql } from '../database/sql';

const router = express.Router();

router.post('/delete', async (req, res) => {
  const { Doctor_dct_id, Patient_patient_id } = req.body;
  try {
      await deleteSql.deleteExamination(Doctor_dct_id, Patient_patient_id);
      res.redirect('/');
  } catch (error) {
      console.error(error);
      res.status(500).send('Error occurred while deleting examination record');
  }
});

router.post('/edit/:Doctor_dct_id/:Patient_patient_id', async (req, res) => {
  const { Doctor_dct_id, Patient_patient_id } = req.params;
  const updatedData = req.body;
  try {
      await editSql.editExamination(Doctor_dct_id, Patient_patient_id, updatedData);
      res.redirect('/');
  } catch (error) {
      console.error(error);
      res.status(500).send('Error occurred while updating examination record');
  }
});

router.post('/add-examination', async (req, res) => {
  try {
      const { Doctor_dct_id, Patient_patient_id, exam_date, exam_details } = req.body;
      await createSql.enterExamination(Doctor_dct_id, Patient_patient_id, exam_date, exam_details);
      res.redirect('/');
  } catch (error) {
      console.error('Error adding examination:', error);
      res.status(500).send('An error occurred while adding the examination record.');
  }
});

export default router;
