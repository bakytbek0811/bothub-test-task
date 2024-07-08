import { NextFunction, Request, Response } from 'express';
import { UnauthorizedException } from '../controllers/exceptions';
import { verify } from 'jsonwebtoken';
import { Config } from '../domains/config';
import { Types } from 'mongoose';

export const verifyAccessToken = async (req: Request, _res: Response, next: NextFunction) => {
    const authorization = req.headers['authorization'];

    if (!authorization) {
        throw new UnauthorizedException();
    }

    const accessToken = authorization.split(' ')[1];
    const tokenType = authorization.split(' ')[0];

    if (tokenType !== 'Bearer') {
        throw new UnauthorizedException();
    }

    try {
        const data = verify(accessToken, Config.jwtSecret) as { id: string };

        req.userData = {
            id: new Types.ObjectId(data.id),
        };
    } catch (e) {
        throw new UnauthorizedException();
    }

    next();
};
