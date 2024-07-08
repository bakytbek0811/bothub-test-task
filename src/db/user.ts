import { Document, Schema } from 'mongoose';
import { Database } from './db';
import { UserRoleEnum } from '../domains/user';

const COLLECTION_NAME = 'User';

export interface IUser extends Document {
    username: string;
    password: string;
    email: string;
    role: UserRoleEnum;
}

const UserSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
        autoIndex: true,
        autoCreate: true,
    },
);

export const UserModel = Database.mainDatabaseConnection.model<IUser>(COLLECTION_NAME, UserSchema, COLLECTION_NAME);
