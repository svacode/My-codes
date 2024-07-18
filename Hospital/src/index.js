import express from "express";
import logger from "morgan";
import path from "path";
import liveReload from 'livereload';
import connectLiveReload from 'connect-livereload';

import loginRouter from "./routes/login";
import logoutRouter from './routes/logout';
import examinationRoutes from './routes/examinationRoutes'; 
import treatmentRoutes from './routes/treatmentRoutes'; 
import searchRoute from './routes/search'; 
import reservationRoutes from './routes/reservationRoutes'; 
import employeeUpdateRoutes from './routes/employeeUpdate'; 








const PORT = 3000;

const liveReloadServer = liveReload.createServer(); 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100)
});

const app = express();

app.use(connectLiveReload());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, 'public')));
// css 경로 설정

app.use(logger("dev"));

app.use("/", loginRouter);
app.use("/logout", logoutRouter);
app.use('/examination', examinationRoutes);
app.use('/treatment', treatmentRoutes);
app.use('/', searchRoute);
app.use('/', reservationRoutes);
app.use('/', employeeUpdateRoutes);






app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
