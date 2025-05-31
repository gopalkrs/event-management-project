import { integer, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "./user";
import { eventTypesEnum } from "./enums";


export const events = pgTable("events",{
    id: serial("id").primaryKey(),
    title : varchar("title", {length: 255}).notNull(),
    description : varchar("description").notNull(),
    location: varchar("location").notNull(),
    startTime: timestamp("start_time").notNull(),
    endTime: timestamp("start_time").notNull(),
    eventType: eventTypesEnum("event_type").notNull(),
    capacity: integer("capacity"),
    createdBy: integer("created_by").references(()=> users.id, {onDelete: 'cascade', onUpdate: 'cascade'}),
    eventTags: text("tags").array(),
})