import { pgEnum, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { roleTypeEnum } from "./enums";


export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    hashedPassword: varchar("email", { length: 255 }).notNull(),
    profilePicture: text("profile_picture"),
    bio: text("bio"),
    roleType: roleTypeEnum("role_type").notNull().default('attendee'), 
    
});