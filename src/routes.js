import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionsController';

import authMiddleware from './app/middlewares/auth';

const routes = Router();

routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

routes.use(authMiddleware);
routes.get('/users', UserController.index);
routes.put('/users/:user_id', UserController.update);

export default routes;
