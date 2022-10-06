import { NextFunction, Request, Response } from 'express';
import { comparePassword, tokenizer } from '../helpers';
import { userService } from '../services';
import { customErrors, ErrorHandler } from '../errors';
import { ActionEnum, ResponseStatusCodesEnum } from '../constants';
import { authService } from '../services';

class AuthController {
  async authUser(req: Request, res: Response, next: NextFunction) {
    try {
      const authInfo = req.body;
      const user = await userService.findOneByParams({email:req.body.email});

      const isPasswordEquels = await comparePassword(authInfo.password, user.password);
        if (!isPasswordEquels) {
          throw new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND,
              customErrors.NOT_FOUND_USER.message
          );
        }

        const {access_token, refresh_token} = tokenizer(ActionEnum.USER_AUTH);

        await authService.createTokenPair({
          accessToken: access_token,
          refreshToken: refresh_token,
          userId:user._id
        });
        res.json({access_token, refresh_token});

    } catch (err) {
      return next(err);
    }
  }

}

export const authController = new AuthController();
