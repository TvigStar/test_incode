import { Document, Model, model, Schema } from 'mongoose';
import { IUser } from '../../interfaces';
import { TableNamesEnum } from '../../constants';

export type UserType = IUser & Document

export const UserSchema: Schema = new Schema<IUser>({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  boss: {
    type: Schema.Types.ObjectId
  },
  role: {
    type: String,
    required: true,
    default: TableNamesEnum.USER,
    enum: Object.values(TableNamesEnum)
  }
});

export const UserModel: Model<UserType> = model<UserType>(TableNamesEnum.USER, UserSchema);
