import dotenv from 'dotenv';
dotenv.config();

type ConfigType = {
    mainDatabaseConnection: string;
    clientApiPort: number;
    jwtSecret: string;
};

export const Config: ConfigType = {
    mainDatabaseConnection: process.env.MAIN_DATABASE_CONNECTION || '',
    clientApiPort: parseInt(process.env.CLIENT_API_PORT || '3000'),
    jwtSecret: process.env.JWT_SECRET || '',
};
