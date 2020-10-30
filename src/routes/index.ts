import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ working: true });
});

export default routes;
