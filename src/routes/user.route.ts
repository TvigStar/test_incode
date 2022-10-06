import { Router } from 'express';
import { userController } from '../controller';
import { checkIsUserValidMiddleware } from '../middleware';
import { checkIsEmailExistMiddleware } from '../middleware';
import { checkAccessUserTokenMiddleware } from '../middleware';
import {checkIsAdminExistMiddleware} from "../middleware/validators/checkIsAdminExist";

const router = Router();

router.post('/register',
  checkIsUserValidMiddleware,
  checkIsEmailExistMiddleware,
  userController.createUser);

router.post('/register/admin',
    checkIsUserValidMiddleware,
    checkIsEmailExistMiddleware,
    checkIsAdminExistMiddleware,
    userController.createAdmin
);

router.get('/',
  checkAccessUserTokenMiddleware,
  userController.getUsers
);

router.put('/change-boss',
  checkAccessUserTokenMiddleware,
  userController.changeUserBoss
);

export const userRouter = router;
