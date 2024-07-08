import { NextFunction, Request, Response } from 'express';
import { BadRequestException } from '../controllers/exceptions';
import { isDateString, isString } from 'class-validator';

export const validateCreateBookData = (req: Request, res: Response, next: NextFunction) => {
    const { title, author, publicationDate, genres } = req.body;

    const errors: string[] = [];

    if (!isString(title)) {
        errors.push('Title must be a string');
    }
    if (!isString(author)) {
        errors.push('Author must be a string');
    }
    if (!isDateString(publicationDate)) {
        errors.push('Publication date must be a string');
    }
    if (!Array.isArray(genres)) {
        errors.push('Genres must be an array');
    }

    if (errors.length > 0) {
        throw new BadRequestException(errors);
    }

    next();
};
