import { AccessTokenModel } from '../../database';
import { IAccessToken } from '../../interfaces';
import { IUser } from '../../interfaces';

class AuthService {
  createTokenPair(tokenObject: Partial<IAccessToken>): Promise<IAccessToken> {
    const tokensToCreate = new AccessTokenModel(tokenObject);

    return tokensToCreate.save();
  }

  async findUserByToken(findObject: { accessToken?: string }): Promise<any>{
    const tokenAndUser = (await AccessTokenModel.findOne(findObject)
      .populate('userId')
      .select({ userId: 1, _id: 0 })) as any;

    return tokenAndUser?.userId?.toJSON();
  }

}
export const authService = new AuthService();
