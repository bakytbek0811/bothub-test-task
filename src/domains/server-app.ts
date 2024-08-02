import 'express-async-errors';

import express, { Application, NextFunction, Request, Response } from 'express';
import compression from 'compression';
import { httpErrors } from '../controllers/error';
import { NotFoundException } from '../controllers/exceptions';
import { Controller } from '../controllers';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

export class ServerApp {
    public app: Application;
    public port: number;
    private controllers: Controller[] = [];

    constructor(controllers: Controller[], port: number) {
        this.app = express();
        this.port = port;
        this.controllers = controllers;
    }

    private initializeMiddlewares(): void {
        this.app.use(compression());
        this.app.use(cors());
        this.app.use(this.customCors);
        this.app.use(express.json());
    }

    private customCors(_req: Request, res: Response, next: NextFunction): void {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        next();
    }

    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    public init(): void {
        this.initializeMiddlewares();

        this.initializeControllers(this.controllers);

        this.app.use('*', (req: Request, _res: Response) => {
            console.log(`ROUTE NOT FOUND: ${req.baseUrl}`);
            throw new NotFoundException();
        });
        this.app.use(httpErrors);

        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port} | ${new Date()}`);
        });
    }
}
