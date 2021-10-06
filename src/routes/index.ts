import { Router } from 'express';

import app from './app';
import auth from './auth';
import enrollment from './enrollment'

const router = Router();

router.use('/app', app);

router.use('/auth', auth);

router.use('/enrollment', enrollment)

export default router;
