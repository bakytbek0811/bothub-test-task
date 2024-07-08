import { Controller } from './controllers';
import { BookController } from './controllers/book';
import { UserController } from './controllers/user';
import { initDatabase } from './db/init-database';
import { Config } from './domains/config';
import { ServerApp } from './domains/server-app';

const start = async (): Promise<void> => {
    const controllers: Controller[] = [new BookController(), new UserController()];

    new ServerApp(controllers, Config.clientApiPort).init();
};

initDatabase().then(start);
