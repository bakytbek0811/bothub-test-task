import { Database } from './db';

export const initDatabase = async (): Promise<void> => {
    await Database.initMainDatabaseConnection();
};
