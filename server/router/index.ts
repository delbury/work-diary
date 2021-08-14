import Router from 'koa-router';
import yearsRouter from './years.js';

const router = new Router();
router.use('/years', yearsRouter.routes());

export default router;
