import { pgTable, index, unique, pgPolicy, check, serial, varchar, integer, timestamp, text, date } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const checkins = pgTable("checkins", {
	id: serial().primaryKey().notNull(),
	userId: varchar("user_id", { length: 255 }).notNull(),
	dayNumber: integer("day_number").notNull(),
	weekNumber: integer("week_number").notNull(),
	completedAt: timestamp("completed_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	notes: text(),
	codeSubmitted: text("code_submitted"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	index("idx_checkins_day_number").using("btree", table.dayNumber.asc().nullsLast().op("int4_ops")),
	index("idx_checkins_user_id").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	index("idx_checkins_week_number").using("btree", table.weekNumber.asc().nullsLast().op("int4_ops")),
	unique("checkins_user_id_day_number_key").on(table.userId, table.dayNumber),
	pgPolicy("Users can insert own checkins", { as: "permissive", for: "insert", to: ["public"], withCheck: sql`true`  }),
	pgPolicy("Users can view own checkins", { as: "permissive", for: "select", to: ["public"] }),
	check("checkins_day_number_check", sql`(day_number >= 1) AND (day_number <= 30)`),
	check("checkins_week_number_check", sql`(week_number >= 1) AND (week_number <= 5)`),
]);

export const healthCheck = pgTable("health_check", {
	id: serial().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const userProgress = pgTable("user_progress", {
	id: serial().primaryKey().notNull(),
	userId: varchar("user_id", { length: 255 }).notNull(),
	currentDay: integer("current_day").default(1),
	totalDaysCompleted: integer("total_days_completed").default(0),
	streakDays: integer("streak_days").default(0),
	lastCheckinDate: date("last_checkin_date"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	unique("user_progress_user_id_key").on(table.userId),
	pgPolicy("Users can insert own progress", { as: "permissive", for: "insert", to: ["public"], withCheck: sql`true`  }),
	pgPolicy("Users can view own progress", { as: "permissive", for: "select", to: ["public"] }),
]);

export const messages = pgTable("messages", {
	id: serial().primaryKey().notNull(),
	userName: varchar("user_name", { length: 100 }),
	content: text().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	index("idx_messages_created_at").using("btree", table.createdAt.asc().nullsLast().op("timestamptz_ops")),
	pgPolicy("Anyone can insert messages", { as: "permissive", for: "insert", to: ["public"], withCheck: sql`true` }),
	pgPolicy("Anyone can view messages", { as: "permissive", for: "select", to: ["public"] }),
]);
