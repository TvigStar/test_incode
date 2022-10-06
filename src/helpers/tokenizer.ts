import * as jwt from 'jsonwebtoken';

import { ActionEnum, ResponseStatusCodesEnum } from '../constants';
import { ErrorHandler } from '../errors';
import { config } from '../config';

export const tokenizer = (action: ActionEnum): any => {
  let access_token = '';
  let refresh_token = '';

  switch (action) {
    case ActionEnum.USER_AUTH:
      access_token = jwt.sign({}, config.JWT_SECRET, {expiresIn: config.ACCESS_TOKEN_LIFETIME});
      refresh_token = jwt.sign({}, config.JWT_REFRESH_SECRET, {expiresIn: config.REFRESH_TOKEN_LIFETIME});
      break;

    default:
      throw new ErrorHandler(ResponseStatusCodesEnum.SERVER, 'wrong action type');
  }

  return {
    access_token,
    refresh_token
  };
};

