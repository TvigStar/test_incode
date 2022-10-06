import { IUser } from '../../interfaces';
import { UserModel } from '../../database';
import { Types } from 'mongoose';

class UserService{
  create(user: Partial<IUser>): Promise<IUser> {
    const userToCraete = new UserModel(user);

    return userToCraete.save();
  }

  findAll(){
    return UserModel.find({});
  }

  findOneByParams(findObject: Partial<IUser>): Promise<IUser> | null {
    return UserModel.findOne(findObject) as any;
  }

  findUserById(id: Types.ObjectId | string): Promise<IUser> {
    return UserModel.findById(id).exec();
  }

  updateById(id: string, user: Partial<IUser>): Promise<IUser> {
    return UserModel.findByIdAndUpdate(id, user).exec();
  }

  findAllByParam(findObject: Partial<IUser>): Promise<IUser[]> {
    return UserModel.find(findObject) as any;
  }

  findOneAndUpdateRole(findObject: Partial<IUser>, id: Types.ObjectId) {
    return UserModel.findOneAndUpdate(findObject, {boss: id});
  }

  findByIdAndUpdate(id: Types.ObjectId, update: any){
    return UserModel.findByIdAndUpdate(id, update)
}

}

export const userService = new UserService();
