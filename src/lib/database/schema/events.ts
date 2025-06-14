import { integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./user";
import { eventTypesEnum } from "./enums";

export const events = pgTable("events",{
    id: uuid("id").primaryKey().defaultRandom(),
    title : varchar("title", {length: 255}).notNull(),
    description : varchar("description").notNull(),
    image: text("image").notNull(),
    state: text("state").notNull(),
    city: text("city").notNull(),
    venue: text("venue"),
    eventPrice: integer("event_price"),
    startTime: timestamp("start_time").notNull(),
    endTime: timestamp("end_time").notNull(),
    date: timestamp("date"),
    eventType: eventTypesEnum("event_type").notNull(),
    capacity: integer("capacity"),
    createdBy: text("created_by").references(()=> users.id, {onDelete: 'cascade', onUpdate: 'cascade'}),
    eventTags: text("tags").array(),
});

//price, location, to be added later