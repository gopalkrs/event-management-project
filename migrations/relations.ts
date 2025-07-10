import { relations } from "drizzle-orm/relations";
import { user, orders, events, bookings, account, authenticator, session, profiles } from "./schema";

export const ordersRelations = relations(orders, ({one}) => ({
	user: one(user, {
		fields: [orders.userId],
		references: [user.id]
	}),
	event: one(events, {
		fields: [orders.eventId],
		references: [events.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	orders: many(orders),
	bookings: many(bookings),
	accounts: many(account),
	authenticators: many(authenticator),
	sessions: many(session),
	profiles: many(profiles),
	events: many(events),
}));

export const eventsRelations = relations(events, ({one, many}) => ({
	orders: many(orders),
	bookings: many(bookings),
	user: one(user, {
		fields: [events.createdBy],
		references: [user.id]
	}),
}));

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

export const profilesRelations = relations(profiles, ({one}) => ({
	user: one(user, {
		fields: [profiles.userId],
		references: [user.id]
	}),
}));