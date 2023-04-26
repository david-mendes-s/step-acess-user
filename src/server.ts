import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import userRoutes from './routes/routes';
import authenticationRoutes from './routes/routes.authentication';
import refresTokenRoute from './routes/routes.refreshtoken';

import './provider/container';
import './provider/DateProvider';

const app = express();

app.use(express.json());

app.use('/user', userRoutes);
app.use('/login', authenticationRoutes);
app.use('/refresh-token', refresTokenRoute);

app.use((error:Error, request:Request, response:Response, next:NextFunction) =>{
    return response.json({
        error: "Error",
        message: error.message
    })
})


app.listen(3333, () => console.log("Servidor rodando!!!"));