import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { HttpException } from './exceptions';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const httpErrors: ErrorRequestHandler = (
    err: ErrorRequestHandler,
    _req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction,
) => {
    console.log(err);

    if (err instanceof HttpException) {
        res.status(err.status)
            .send({
                statusCode: err.status,
                message: err.message,
            })
            .end();

        return;
    }

    res.status(500)
        .send({
            statusCode: 500,
            message: 'Internal Server Error',
        })
        .end();
};
