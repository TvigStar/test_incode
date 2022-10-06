import { NextFunction, Request, Response } from 'express';

import { newUserValidator } from '../../validators';

export const checkIsUserValidMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const {error} = newUserValidator.validate(req.body);

  if (error) {
    return next(new Error(error.details[0].message));
  }
  next();
};

