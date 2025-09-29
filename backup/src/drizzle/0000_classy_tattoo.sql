-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `users` (
	`id` integer PRIMARY KEY,
	`name` text
);
--> statement-breakpoint
CREATE TABLE `epics` (
	`id` integer PRIMARY KEY,
	`name` text
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY,
	`title` text,
	`epicId` integer,
	`userId` integer
);
--> statement-breakpoint
CREATE TABLE `milestones` (
	`id` integer PRIMARY KEY,
	`epicId` integer,
	`name` text
);

*/