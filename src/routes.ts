import { Router } from 'express';
import { MessagesController } from './controllers/MessagesController';
import { SettingsController } from './controllers/SettingsController';
import { UsersController } from './controllers/UsersController';

const routes = Router();
const settingsControllers = new SettingsController();
const usersControllers = new UsersController();
const messagesControllers = new MessagesController();

routes.post('/settings', settingsControllers.create);
routes.get('/settings/:username', settingsControllers.findByUsername);
routes.put('/settings/:username', settingsControllers.update);

routes.post('/users', usersControllers.create);

routes.post('/messages', messagesControllers.create);
routes.get('/messages/:id', messagesControllers.showByUser);

export { routes };