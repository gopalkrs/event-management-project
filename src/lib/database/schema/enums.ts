import { pgEnum } from "drizzle-orm/pg-core";

export const eventTypesEnum = pgEnum('event_type', ['concert', 'theatre', 'comedy', 'activities', 'meetups', 'sports', 'exhibition', 'festival', 'conference', 'workshop', 'food_and_drink', 'other']);

export const statusTypeEnum = pgEnum("status", ['confirmed', 'cancelled', 'pending']);

