import {Router} from 'express';
import { authController } from '../controller/auth.controller';

const router = Router();

router.post('/signin',
  authController.authUser);

export const authRouter = router;
