import { Router } from 'express';

import auth from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckInController from './app/controllers/CheckInController';
import HelpOrderController from './app/controllers/HelpOrderController';
import HelpOrderAnswerController from './app/controllers/HelpOrderAnswerController';
import StudentLogInController from './app/controllers/StudentLogInController';

const routes = new Router();

routes.post('/admin', SessionController.store);

routes.get('/student', StudentLogInController.index);

routes.get('/students', auth, StudentController.index);
routes.post('/students', auth, StudentController.store);
routes.put('/students/:id', auth, StudentController.update);
routes.delete('/students/:id', auth, StudentController.delete);

routes.get('/plans', auth, PlanController.index);
routes.post('/plans', auth, PlanController.store);
routes.put('/plans/:id', auth, PlanController.update);
routes.delete('/plans/:id', auth, PlanController.delete);

routes.get('/enrollments', auth, EnrollmentController.index);
routes.post('/enrollments', auth, EnrollmentController.store);
routes.put('/enrollments/:id', auth, EnrollmentController.update);
routes.delete('/enrollments/:id', auth, EnrollmentController.delete);

routes.get('/students/:id/checkins', CheckInController.index);
routes.post('/students/:id/checkins', CheckInController.store);

routes.get('/students/:id/help-orders', HelpOrderController.index);
routes.post('/students/:id/help-orders', HelpOrderController.store);

routes.get('/help-orders', auth, HelpOrderAnswerController.index);
routes.put('/help-orders/:id/answer', auth, HelpOrderAnswerController.update);

export default routes;
