import * as dotenv from 'dotenv';
import type { Config } from 'drizzle-kit';
dotenv.config({path: '.env'});

if(!process.env.DATABASE_URL){
    console.log("Cannot find database url")
}

export default {
    schema: './src/lib/database/schema.ts',
    out: './migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL || '',
    },
} satisfies Config;