import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './api-docs/swagger.json';
import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';
import authHasPrevileges from './app/middlewares/authHasPrevileges';

const options = {
  customCss: '.swagger-ui .topbar {display: none}',
};

const routes = new Router();

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument, options));

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.get('/recipients', RecipientsController.index);

routes.use(authHasPrevileges);
routes.post('/recipients', RecipientsController.store);
routes.put('/recipients/:id', RecipientsController.update);

export default routes;
