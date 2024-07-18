import cookieParser from "cookie-parser";
import express from "express";
import expressSession from 'express-session';
import { selectSql, editSql, deleteSql } from "../database/sql"; 




const router = express.Router();

router.use(cookieParser());
router.use(expressSession({
    secret: 'dilab',
    resave: true,
    saveUninitialized: true,
}));

router.get('/', async (req, res) => {
    if (req.session.user) {
        const exam = await selectSql.getExamination();
        const treat = await selectSql.getTreatment();


        const user = {
            ...req.session.user,
            isAdmin: req.session.role === 1,
            isDoctor: req.session.role === 2,
            isNurse: req.session.role === 3,
            isPatient: req.session.role === 4,
        };

        if (user.isAdmin) {
            res.render('admin', { 
                user: user,
                doctors: await selectSql.getDoctors(),
                nurses: await selectSql.getNurses(),
                title1: "Doctors",
                title2: "Nurses",
            });
        } else if (user.isPatient) {
        const patientId = parseInt(req.session.user, 10);
        const reservations = await selectSql.getReservationsByPatientId(patientId);
        res.render('patient', { 
            appointments: reservations,
             });
            
             
        } else {

            res.render('employee', {
                user: user,
                examinationRecords: exam,
                treatmentRecords: treat,
            });
        }
    } else {
        res.render('login');
    }
});



router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

router.post('/', async (req, res) => {
    const vars = req.body;
    const users = await selectSql.getUsers();
    let checkLogin = false;

    const userId = parseInt(vars.id, 10);
    const userPassword = parseInt(vars.password, 10);

    users.forEach((user) => {
        console.log(user, vars)
        if (userId === user.id && userPassword === user.password) {
            checkLogin = true;
            req.session.user = user.id;
            req.session.role = user.role;
        }
    });

    if (checkLogin) {
        res.redirect('/'); 
        res.render('login', { message: 'Invalid credentials' });
    }
});






module.exports = router;
