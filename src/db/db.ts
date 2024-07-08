import { Mongoose } from 'mongoose';
import { Config } from '../domains/config';

export class Database {
    public static mainDatabaseConnection = new Mongoose();
    public static async initMainDatabaseConnection(): Promise<void> {
        const connectionUrl = Config.mainDatabaseConnection;

        console.log(`Trying to connect to database: ${connectionUrl}...`);
        Database.mainDatabaseConnection
            .connect(connectionUrl)
            .then(() => console.log(`Connected to database ${connectionUrl}`))
            .catch((error) => console.error(`Error connecting to database ${connectionUrl}`, error));
    }
}
