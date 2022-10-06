import { NextFunction, Request, Response } from 'express';
import {  userService } from '../services';
import { IUser } from '../interfaces';
import { hashPassword } from '../helpers';
import { customErrors, ErrorHandler } from '../errors';
import { ResponseStatusCodesEnum, TableNamesEnum } from '../constants';
import { IRequestExtended } from '../interfaces';

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body as IUser;

      user.password = await hashPassword(user.password);
      const boss = await userService.findUserById(req.body.boss)

      if (!(boss.role === TableNamesEnum.ADMIN)){
        await userService.updateById(req.body.boss, {role: TableNamesEnum.BOSS});
      }

      const newUser = await userService.create(user);

      res.json(newUser);
    } catch (err) {
      next(err);
    }
  }

  async createAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body as IUser;

      user.password = await hashPassword(user.password);
      user.role = TableNamesEnum.ADMIN

      const newAdmin = await userService.create(user);

      res.json(newAdmin);
    } catch (err) {
      next(err);
    }
  }

  async getUsers(req: IRequestExtended, res: Response, next: NextFunction){
    async function recurs(boss: any) {
      const subordinates = (await userService.findAllByParam({boss:boss._id})).map(
          user => user.toObject()
      );

      boss.subs = subordinates;
      for (const sub of subordinates) {
        await recurs(sub);
      }
      return boss
    }

    try {
      console.log(req.user)
      let data
      switch (req.user.role) {
        case TableNamesEnum.ADMIN:
          data = await userService.findAll();
          break;

        case TableNamesEnum.USER:
        data = await userService.findUserById(req.user._id);
        break;

        case TableNamesEnum.BOSS:
        data = await recurs(req.user);
        break;
      }

      res.json(data);
    }
    catch (err) {
      next(err);
    }
  }

  async changeUserBoss(req: IRequestExtended, res: Response, next: NextFunction){
    try {
      const user = await userService.findOneAndUpdateRole({
        _id: req.body.user,
        boss: req.user._id
      }, req.body.boss);

      if (!user){
        return next(new ErrorHandler(
          ResponseStatusCodesEnum.BAD_REQUEST,
          customErrors.NOT_FOUND_USER.message
        ));
      }

      await userService.updateById(req.body.boss, {role: TableNamesEnum.BOSS});
      const boss = await userService.findOneByParams({boss: req.user._id})
      if (!boss){
        await userService.findByIdAndUpdate(req.user._id, {role: TableNamesEnum.USER})
      }

      res.sendStatus(ResponseStatusCodesEnum.OK);
    } catch (err) {
      next(err);
    }
  }
}

export const userController = new UserController();
