import { NextFunction, Request, Response } from 'express';
import { userService } from '../../services';
import { customErrors, ErrorHandler } from '../../errors';
import {ResponseStatusCodesEnum, TableNamesEnum} from '../../constants';

export const checkIsAdminExistMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.findAll()

    if (users.length) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST,
          customErrors.BAD_REQUEST_ADMINISTRATOR_REGISTERED.message,
          customErrors.BAD_REQUEST_ADMINISTRATOR_REGISTERED.customCode
      ));
    }

    next();
  } catch (err) {
    next(err);
  }
};
