import { Router } from 'express';
import UserAuthenticationController from '../infra/user/http/controllers/UserAuthentication/UserAuthenticationController';

const routes = Router();

const userAuthenticationController = new UserAuthenticationController();

routes.post('/', userAuthenticationController.create);

export default routes;