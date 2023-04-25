import { Router } from 'express';
import UserCreateController from '../infra/user/http/controllers/UserCreateController';
import UserListController from '../infra/user/http/controllers/UserListController';
import UserDeleteController from '../infra/user/http/controllers/UserDeleteController';
import ensureAuthentication from '../infra/user/http/middlewares/ensureAuthentication'

const routes = Router();

const userListControllers = new UserListController();
const userCreateControllers = new UserCreateController();
const userDeleteController = new UserDeleteController();

routes.post('/', userCreateControllers.create);
routes.get('/', ensureAuthentication, userListControllers.index);
routes.delete('/remove', ensureAuthentication, userDeleteController.delete);

export default routes;



