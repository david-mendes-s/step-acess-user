import { Router } from 'express';
import RefreshTokenCreateController from '../infra/refresh_token/http/controllers/RefreshTokenCreateController';

const routes = Router();


const refreshTokenCreateController = new RefreshTokenCreateController();


routes.post('/', refreshTokenCreateController.create);

export default routes;