import { Types } from 'mongoose';
import { IUser, UserModel } from '../db/user';
import { UserRoleEnum } from '../domains/user';

export type SaveUserType = {
    username: string;
    password: string;
    email: string;
    role: UserRoleEnum;
};

export type FindOneUserType =
    | {
          username: string;
      }
    | {
          email: string;
      }
    | {
          _id: Types.ObjectId;
      };

export type UpdateUserType = {
    role?: UserRoleEnum;
};

export class UserData {
    public static async save(data: SaveUserType): Promise<IUser> {
        return UserModel.create(data);
    }

    public static async findOne(findOne: FindOneUserType): Promise<IUser | null> {
        return UserModel.findOne(findOne);
    }

    public static async updateOne(findOne: FindOneUserType, data: UpdateUserType): Promise<void> {
        await UserModel.updateOne(findOne, data);
    }
}
