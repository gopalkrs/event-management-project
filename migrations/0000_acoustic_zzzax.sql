CREATE TYPE "public"."event_type" AS ENUM('concert', 'theatre', 'comedy', 'sports', 'exhibition', 'festival', 'conference', 'workshop', 'food_and_drink', 'other');--> statement-breakpoint
CREATE TYPE "public"."role_type" AS ENUM('organizer', 'attendee');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('confirmed', 'cancelled', 'pending');--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" integer,
	"user_id" integer,
	"booked_at" timestamp DEFAULT now(),
	"status" "status" DEFAULT 'pending' NOT NULL,
	"number_of_tickets" integer DEFAULT 1 NOT NULL,
	"amount" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar NOT NULL,
	"location" varchar NOT NULL,
	"start_time" timestamp NOT NULL,
	"event_type" "event_type" NOT NULL,
	"capacity" integer,
	"created_by" integer,
	"tags" text[]
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"profile_picture" text,
	"bio" text,
	"role_type" "role_type" DEFAULT 'attendee' NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;