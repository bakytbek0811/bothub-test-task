import { Types } from 'mongoose';
import { SaveUserType, UpdateUserType, UserData } from '../data/user';
import { IUser } from '../db/user';
import { sign } from 'jsonwebtoken';
import { Config } from './config';
import { BadRequestException, NotFoundException } from '../controllers/exceptions';
import { compareSync, hashSync } from 'bcryptjs';
import { serializeJson } from '../utils/json';

export enum UserRoleEnum {
    USER = 0,
    ADMIN = 1,
}

export class User {
    public static async register(data: SaveUserType) {
        data.password = hashSync(data.password, 10);
        data.role = UserRoleEnum.USER;

        const user = await UserData.save(data);

        const accessToken = this.getUserAccessToken(user);

        return {
            accessToken,
        };
    }

    public static async login(username: string, password: string) {
        const user = await UserData.findOne({ username });
        if (!user) {
            throw new BadRequestException('Invalid username or password');
        }
        if (!compareSync(password, user.password)) {
            throw new BadRequestException('Invalid username or password');
        }

        const accessToken = this.getUserAccessToken(user);

        return {
            accessToken,
        };
    }

    public static async me(id: Types.ObjectId): Promise<void> {
        const user = await UserData.findOne({ _id: id });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return serializeJson('USER', user);
    }

    public static async updateRole(id: Types.ObjectId, data: UpdateUserType): Promise<void> {
        await UserData.updateOne({ _id: id }, data);

        const user = await UserData.findOne({ _id: id });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return serializeJson('USER', user);
    }

    private static getUserAccessToken(user: IUser): string {
        const payload = {
            id: user._id,
        };

        const token = sign(payload, Config.jwtSecret);

        return token;
    }
}
