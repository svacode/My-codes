// reservationRoutes.js or similar file
import express from 'express';
import promisePool from '../database/sql';
import { deleteSql, createSql} from '../database/sql';




const router = express.Router();


router.post('/make-reservation', async (req, res) => {
  const { user, specialtyDepId, resDateTime } = req.body;
  const patientId = parseInt(user, 10);

  console.log("Received patientId:", req.body.user);
  console.log("Parsed Patient ID:", patientId);

  if (isNaN(patientId)) {
    return res.status(400).json({ success: false, message: 'Invalid patient ID' });
  }

  try {
    const reservationId = await createSql.createReservation(patientId, specialtyDepId, resDateTime);
    
    res.json({ success: true, message: 'Reservation created', reservationId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error creating reservation' });
  }
});





router.post('/cancel-reservation', async (req, res) => {
    const reservationId = parseInt(req.body.reservationId, 10);    

    try {
        await deleteSql.cancelReservation(reservationId);
        res.redirect('/'); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Error canceling the reservation');
    }
});

export default router;
