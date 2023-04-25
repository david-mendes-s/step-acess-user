import { Router } from 'express';
import RefreshTokenController from '../infra/refreshToken/controllers/RefreshTokenController';
import ensureAuthentication from '../infra/user/http/middlewares/ensureAuthentication'

const routes = Router();

const refreshTokenController = new RefreshTokenController();

routes.post('/', ensureAuthentication ,refreshTokenController.create);

export default routes;