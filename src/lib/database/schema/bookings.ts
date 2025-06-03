import { integer, numeric, pgTable, timestamp, uuid} from "drizzle-orm/pg-core";
import { events } from "./events";
import { users } from "./user";
import { statusTypeEnum } from "./enums";


export const bookings = pgTable("bookings", {
    id: uuid("id").primaryKey().defaultRandom(),
    eventId: uuid("event_id").references(() => events.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    userId: uuid("user_id").references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    bookedAt : timestamp("booked_at").defaultNow(),
    status : statusTypeEnum("status").notNull().default('pending'),
    numberOfTickets: integer("number_of_tickets").notNull().default(1),
    amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
})