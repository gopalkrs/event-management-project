import { pgTable, primaryKey, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

//export const roleTypeEnum = pgEnum('role_type', ['organizer', 'attendee']);


export const user = pgTable("user", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: text("email").unique().notNull(),
    emailVerified: timestamp("emailVerified", { mode: 'date' }),
    image: text("image"),
});

export const account = pgTable('account', {
    userId: uuid('userId').notNull().references(() => user.id, { onDelete: 'cascade' }),
    type: text('type').notNull(),
    provider: text('provider').notNull(),
    providerAccountId: varchar('providerAccountId', {length:255}).notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: timestamp('expires_at', { mode: 'date' }),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  }, (table) => [
    primaryKey({ columns: [table.provider, table.providerAccountId] }), // composite PK
  ]);

  export const session = pgTable('sessions', {
    sessionToken: text('sessionToken').primaryKey(),
    userId: uuid('userId').notNull().references(() => user.id, { onDelete: 'cascade' }),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  });
  
  // Verification tokens (used for email verification or passwordless login)
  export const verificationToken = pgTable('verification_tokens', {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  }, (table) => [
    primaryKey({ columns: [table.identifier, table.token]}),
  ]);
  