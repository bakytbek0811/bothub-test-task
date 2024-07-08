import { NextFunction, Request, Response } from 'express';
import { ForbiddenException } from '../controllers/exceptions';
import { UserRoleEnum } from '../domains/user';
import { UserData } from '../data/user';

export const validationUserAccess = (requiredPermissions: UserRoleEnum[]) => {
    return async (req: Request, _res: Response, next: NextFunction) => {
        const permissions: UserRoleEnum[] = [];
        const user = await UserData.findOne({ _id: req.userData.id });
        if (user) {
            permissions.push(user.role);
        }

        const hasPermission = requiredPermissions.some((permission) => permissions.includes(permission));
        if (!hasPermission) {
            throw new ForbiddenException();
        }

        next();
    };
};
