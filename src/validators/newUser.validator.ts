import * as Joi from 'joi';
import { RegExpEnum } from '../constants';

export const newUserValidator = Joi.object({
  email: Joi.string().trim().regex(RegExpEnum.email).required(),
  password: Joi.string().trim().regex(RegExpEnum.password).required(),
  boss: Joi.string().required(),
  role: Joi.string()
});
