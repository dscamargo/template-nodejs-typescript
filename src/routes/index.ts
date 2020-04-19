import { Router } from 'express';
import AppError from '../errors/AppError';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ working: true });
});

routes.get('/test-error', (req, res) => {
  throw new AppError('Mensagem de erro', 401);
});

export default routes;
