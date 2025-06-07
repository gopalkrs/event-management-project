import { integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./user";
import { eventTypesEnum } from "./enums";

export const events = pgTable("events",{
    id: uuid("id").primaryKey().defaultRandom(),
    title : varchar("title", {length: 255}).notNull(),
    description : varchar("description").notNull(),
    image: text("image").notNull(),
    location: varchar("location").notNull(),
    startTime: timestamp("start_time").notNull(),
    endTime: timestamp("start_time").notNull(),
    eventType: eventTypesEnum("event_type").notNull(),
    capacity: integer("capacity"),
    createdBy: text("created_by").references(()=> users.id, {onDelete: 'cascade', onUpdate: 'cascade'}),
    eventTags: text("tags").array(),
})