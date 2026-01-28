CREATE TABLE `conversations` (
	`_id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`issuingId` text,
	`isArchived` integer DEFAULT 0,
	`isPinned` integer DEFAULT 0,
	`avatar` text,
	`lastMessage` text,
	FOREIGN KEY (`issuingId`) REFERENCES `users`(`_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`_id` text PRIMARY KEY NOT NULL,
	`name` text,
	`firstName` text,
	`lastName` text,
	`fullName` text,
	`gender` text,
	`location` text,
	`email` text,
	`registered` text,
	`phone` text,
	`cell` text,
	`avatar` text
);
