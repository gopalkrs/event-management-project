import { pgTable, text, timestamp, foreignKey, uuid, integer, numeric, unique, boolean, varchar, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const eventType = pgEnum("event_type", ['concert', 'theatre', 'comedy', 'sports', 'exhibition', 'festival', 'conference', 'workshop', 'food_and_drink', 'other', 'parties', 'activities', 'meetups'])
export const genderType = pgEnum("gender_type", ['Male', 'Female', 'Others'])
export const roleType = pgEnum("role_type", ['user', 'admin'])
export const status = pgEnum("status", ['confirmed', 'cancelled', 'pending'])


export const verificationToken = pgTable("verificationToken", {
	identifier: text().notNull(),
	token: text().notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
});

export const bookings = pgTable("bookings", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	eventId: uuid("event_id"),
	userId: text("user_id"),
	bookedAt: timestamp("booked_at", { mode: 'string' }).defaultNow(),
	status: status().default('pending').notNull(),
	numberOfTickets: integer("number_of_tickets").default(1).notNull(),
	amount: numeric({ precision: 10, scale:  2 }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.eventId],
			foreignColumns: [events.id],
			name: "bookings_event_id_events_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "bookings_user_id_user_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const user = pgTable("user", {
	id: text().primaryKey().notNull(),
	name: text(),
	email: text(),
	emailVerified: timestamp({ mode: 'string' }),
	image: text(),
}, (table) => [
	unique("user_email_unique").on(table.email),
]);

export const account = pgTable("account", {
	userId: text().notNull(),
	type: text().notNull(),
	provider: text().notNull(),
	providerAccountId: text().notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text(),
	idToken: text("id_token"),
	sessionState: text("session_state"),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "account_userId_user_id_fk"
		}).onDelete("cascade"),
]);

export const authenticator = pgTable("authenticator", {
	credentialId: text().notNull(),
	userId: text().notNull(),
	providerAccountId: text().notNull(),
	credentialPublicKey: text().notNull(),
	counter: integer().notNull(),
	credentialDeviceType: text().notNull(),
	credentialBackedUp: boolean().notNull(),
	transports: text(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "authenticator_userId_user_id_fk"
		}).onDelete("cascade"),
	unique("authenticator_credentialID_unique").on(table.credentialId),
]);

export const session = pgTable("session", {
	sessionToken: text().primaryKey().notNull(),
	userId: text().notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "session_userId_user_id_fk"
		}).onDelete("cascade"),
]);

export const profiles = pgTable("profiles", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: text("user_id"),
	gender: genderType(),
	role: roleType(),
	city: text(),
	state: text(),
	country: text(),
	dob: timestamp({ mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "profiles_user_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const events = pgTable("events", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	title: varchar({ length: 255 }).notNull(),
	description: varchar().notNull(),
	image: text().notNull(),
	state: text().notNull(),
	city: text().notNull(),
	startTime: timestamp("start_time", { mode: 'string' }).notNull(),
	endTime: timestamp("end_time", { mode: 'string' }).notNull(),
	date: timestamp({ mode: 'string' }).notNull(),
	eventType: eventType("event_type").notNull(),
	capacity: integer(),
	createdBy: text("created_by"),
	tags: text().array(),
	venue: text(),
	eventPrice: integer("event_price"),
	likeCount: integer("like_count").default(0),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [user.id],
			name: "events_created_by_user_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
]);
