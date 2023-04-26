import { Router } from 'express';
import UserAuthenticationController from '../infra/user/http/controllers/UserAuthentication/UserAuthenticationController';
import RefreshTokenCreateController from '../infra/refresh_token/http/controllers/RefreshTokenCreateController';

const routes = Router();

const userAuthenticationController = new UserAuthenticationController();
const refreshTokenCreateController = new RefreshTokenCreateController();

routes.post('/', userAuthenticationController.create);
routes.post('/refresh-token', refreshTokenCreateController.create);

export default routes;