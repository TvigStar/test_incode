import { Types } from 'mongoose';

export interface IAccessToken {
  _id: string,
  accessToken: string,
  refreshToken: string,
  userId: Types.ObjectId,
  adminId: Types.ObjectId,
  createdAt: string
}
