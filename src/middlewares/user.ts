import { isEmail, isString } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { BadRequestException } from '../controllers/exceptions';

export const validateRegistrationData = (req: Request, res: Response, next: NextFunction) => {
    const { username, password, email } = req.body;

    const errors: string[] = [];

    if (!isString(username)) {
        errors.push('Username must be a string');
    }
    if (!isString(password)) {
        errors.push('Password must be a string');
    }
    if (!isString(email)) {
        errors.push('Email must be a string');
    }
    if (!isEmail(email)) {
        errors.push('Email must be a valid email address');
    }

    if (errors.length > 0) {
        throw new BadRequestException(errors);
    }

    next();
};

export const validateLoginData = (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    const errors: string[] = [];

    if (!isString(username)) {
        errors.push('Username must be a string');
    }
    if (!isString(password)) {
        errors.push('Password must be a string');
    }

    if (errors.length > 0) {
        throw new BadRequestException(errors);
    }

    next();
};
