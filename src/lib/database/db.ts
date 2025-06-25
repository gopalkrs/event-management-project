import { drizzle } from "drizzle-orm/postgres-js";
import "dotenv/config"
import postgres from "postgres";
//import { Pool } from "pg";
import * as bookings from "./schema/bookings";
import * as events from "./schema/events";
import * as user from "./schema/user";

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
// });

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client, {
    schema: {
        ...events,
        ...user,
        ...bookings,
    }
});