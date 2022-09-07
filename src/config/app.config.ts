import * as path from 'path';

require('dotenv').config();

export const appConfig = {

    appName: process.env.APP_NAME || 'Portal',

    environment: process.env.APP_ENV || 'production',

    baseUrl: process.env.APP_URL || 'http://localhost:3000',

    port: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 3000,

    secret: process.env.SECRET,

    rootDir: path.join(__dirname, '../../')
    
}
