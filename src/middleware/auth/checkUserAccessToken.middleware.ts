import { NextFunction, Response } from 'express';
import { ActionEnum, RequestHeadersEnum, ResponseStatusCodesEnum } from '../../constants';
import { customErrors, ErrorHandler } from '../../errors';
import { tokenVerification } from '../../helpers';
import { authService } from '../../services';
import { IRequestExtended } from '../../interfaces';


export const checkAccessUserTokenMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.get(RequestHeadersEnum.AUTHORIZATION);

    if (!token) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.UNAUTHORIZED, customErrors.BAD_REQUEST_NO_TOKEN.message));
    }

    await tokenVerification(ActionEnum.USER_AUTH, token);

    const userByToken = await authService.findUserByToken({
      accessToken:token
    });

    if (!userByToken) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, customErrors.NOT_FOUND_USER.message));
    }

    req.user = userByToken;
    next();
  } catch (err) {
    next(err);
  }
};
