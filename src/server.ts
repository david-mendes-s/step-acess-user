import 'reflect-metadata';
import express from 'express';

import userRoutes from './routes/routes';
import authenticationRoutes from './routes/routes.authentication';
import refreshTokenRoutes from './routes/routes.refreshToken';
import './provider/container';

const app = express();

app.use(express.json());

app.use('/user', userRoutes);
app.use('/login', authenticationRoutes);
app.use('/refreshToken', refreshTokenRoutes);

app.listen(3333, () => console.log("Servidor rodando!!!"));