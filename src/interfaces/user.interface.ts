import {Types} from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  role: string;
  boss: Types.ObjectId | string;
  subs: any;
  toObject: () => {}
}
