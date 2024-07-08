import { Router } from 'express';
import { Types } from 'mongoose';

export interface Controller {
    router: Router;
}

declare global {
    namespace Express {
        interface Request {
            userData: {
                id: Types.ObjectId;
            };
        }
    }
}
