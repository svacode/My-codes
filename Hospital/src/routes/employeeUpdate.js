import express from 'express';
import { editSql, deleteSql, createSql } from '../database/sql';

const router = express.Router();



router.post('/doctor/delete/:dct_id', async (req, res) => {
  try {
    const { dct_id } = req.body;
    await deleteSql.deleteDoctors(dct_id);
    res.redirect("/");
  } catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(500).send('An error occurred while deleting the doctor.');
  }
});


router.post('/nurse/delete/:nurse_id', async (req, res) => {
    try {
      const { nurse_id } = req.params;
      await deleteSql.deleteNurses(nurse_id);
      res.status(200).send('Nurse deleted successfully.');
    } catch (error) {
      console.error('Error deleting nurse:', error);
      res.status(500).send('An error occurred while deleting the nurse.');
    }
  });
  









router.post('/add-nurse', async (req, res) => {
  try {
    const { nurse_id, nurse_name, nurse_address, nurse_phonenum,nurse_pass, Medical_specialty_dep_id } = req.body;
    
    const defaultRole = 3;
    await createSql.enterNurse(nurse_id, nurse_name, nurse_address, nurse_phonenum, nurse_pass, Medical_specialty_dep_id, defaultRole);
    
    res.status(200).send('Nurse added successfully.');
  } catch (error) {
    console.error('Error adding nurse:', error);
    res.status(500).send('An error occurred while adding the nurse.');
  }
});


router.post('/add-doctor', async (req, res) => {
  try {
    const { dct_id, dct_name, dct_address, dct_phonenum, dct_pass, Medical_specialty_dep_id } = req.body;
    
    const defaultRole = 2;
    await createSql.enterDoctor(dct_id, dct_name, dct_address, dct_phonenum, dct_pass, Medical_specialty_dep_id, defaultRole);
    res.status(200).send('Doctor added successfully.');
  } catch (error) {
    console.error('Error adding doctor:', error);
    res.status(500).send('An error occurred while adding the doctor.');
  }
});




// Route to edit a nurse
router.post('/nurse/edit/:nurse_id', async (req, res) => {
  try {
    const { nurse_id } = req.params;
    const updatedData = req.body;
    await editSql.editNurse(nurse_id, updatedData);
    res.status(200).send('Nurse edited successfully.');
  } catch (error) {
    console.error('Error editing nurse:', error);
    res.status(500).send('An error occurred while editing the nurse.');
  }
});

// Route to edit a doctor
router.post('/doctor/edit/:dct_id', async (req, res) => {
  try {
    const { dct_id } = req.params;
    const updatedData = req.body;
    await editSql.editDoctor(dct_id, updatedData);
    res.redirect("/");
  } catch (error) {
    console.error('Error editing doctor:', error);
    res.status(500).send('An error occurred while editing the doctor.');
  }
});





  export default router;  