import { relations } from "drizzle-orm/relations";
import { events, bookings, user, account, authenticator, session } from "./schema";

export const bookingsRelations = relations(bookings, ({one}) => ({
	event: one(events, {
		fields: [bookings.eventId],
		references: [events.id]
	}),
	user: one(user, {
		fields: [bookings.userId],
		references: [user.id]
	}),
}));

export const eventsRelations = relations(events, ({one, many}) => ({
	bookings: many(bookings),
	user: one(user, {
		fields: [events.createdBy],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	bookings: many(bookings),
	accounts: many(account),
	authenticators: many(authenticator),
	sessions: many(session),
	events: many(events),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const authenticatorRelations = relations(authenticator, ({one}) => ({
	user: one(user, {
		fields: [authenticator.userId],
		references: [user.id]
	}),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));